import { chromium } from '../.qa-tools/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const mode = process.argv[2] || 'verify';
const root = process.cwd();
fs.mkdirSync('qa', {recursive:true});
fs.mkdirSync('assets/previews', {recursive:true});
const server = http.createServer((req,res)=>{
  const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1) || 'vitrin48-index.html';
  if (name === 'baseline.html') {
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(execFileSync('git',['show','e2d03b2:vitrin48-index.html'])); return;
  }
  const file = path.resolve(root,name);
  if (!file.startsWith(root+path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png'})[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page = await context.newPage();
  const errors=[];
  const failedRequests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>failedRequests.push({url:r.url(),reason:r.failure()?.errorText}));
  await page.addInitScript(()=>{
    window.__v48metrics={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__v48metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__v48metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  });
  if (mode === 'baseline' || mode === 'previews') {
    if (mode === 'baseline') {
      for (const width of [1440,390]) {
        await page.setViewportSize({width,height:1000});
        await page.goto(base+'/baseline.html',{waitUntil:'networkidle'});
        await page.screenshot({path:`qa/before-${width}.png`,fullPage:true});
      }
    }
    await page.setViewportSize({width:1280,height:900});
    for (let i=1;i<=6;i++) {
      await page.goto(base+`/demo${i}.html`,{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:`assets/previews/demo${i}.jpg`,type:'jpeg',quality:76});
    }
  } else if(mode === 'extended') {
    const checks={};
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.goto(base+'/vitrin48-index.html',{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>document.documentElement.style.zoom='2');
    checks.zoom200=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
    await page.screenshot({path:'qa/zoom-200.png'});
    await page.evaluate(()=>document.documentElement.style.zoom='');
    await page.setViewportSize({width:390,height:844});
    await page.locator('#hamburger').click();
    await page.keyboard.press('Shift+Tab');
    checks.menuWrapBack=await page.locator('#hamburger').evaluate(e=>e===document.activeElement);
    await page.keyboard.press('Tab');
    checks.menuWrapForward=await page.locator('#mobileMenu a').first().evaluate(e=>e===document.activeElement);
    await page.screenshot({path:'qa/mobile-menu.png'});
    await page.keyboard.press('Escape');
    await page.locator('.mobile-cta').click();
    await page.locator('#formName').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.body.classList.contains('contact-visible'));
    checks.contactFloatsHidden=await page.locator('.wa').evaluate(e=>getComputedStyle(e).visibility==='hidden');
    checks.focusRing=await page.locator('#formName').evaluate(e=>{e.focus();return getComputedStyle(e).outlineStyle!=='none';});
    await page.screenshot({path:'qa/contact-focus.png'});
    checks.calendlyLoaded=await page.evaluate(()=>typeof window.Calendly?.initPopupWidget==='function');
    checks.calendlyFallback=await page.locator('.calendly-box a').getAttribute('href')==='https://calendly.com/vitrin48';
    await page.setViewportSize({width:320,height:844});
    for(const doc of ['gizlilik.html','kullanim-sartlari.html']){
      await page.goto(base+'/'+doc,{waitUntil:'networkidle'});
      checks[doc+'320']=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
    }
    await page.emulateMedia({reducedMotion:'reduce',contrast:'more'});
    await page.goto(base+'/vitrin48-index.html',{waitUntil:'networkidle'});
    checks.highContrast=await page.locator('#hdr').evaluate(e=>getComputedStyle(e).backdropFilter==='none');
    checks.reducedMotion=await page.evaluate(()=>[...document.getAnimations()].filter(a=>a.playState==='running').length===0);
    const report={checks,errors,failedRequests};
    fs.writeFileSync('qa/extended-results.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    if(Object.values(checks).some(v=>!v)||errors.length)process.exitCode=1;
  } else {
    const results=[];
    for (const width of [1440,1024,768,390,320]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(base+'/vitrin48-index.html',{waitUntil:'networkidle'});
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:`qa/hero-${width}.png`});
      const initialMetrics=await page.evaluate(()=>({...window.__v48metrics,resourceBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)}));
      for (const img of await page.locator('.preview-shot img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(e=>e.decode());
      }
      if ([1440,390].includes(width)) {
        for (const section of ['surec','paketler','ornekler','iletisim']) {
          await page.locator('#'+section).screenshot({path:`qa/${section}-${width}.png`,style:'header,.skip-link,.wa,.back-top{visibility:hidden!important}'});
        }
      }
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      results.push({...await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
        overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width && (r.right>innerWidth+1||r.left < -1) && getComputedStyle(e).position!=='fixed';}).map(e=>e.tagName+'.'+e.className).slice(0,20),
        iframes:document.querySelectorAll('iframe').length,
        heading:document.querySelector('h1').innerText,
        loadedFonts:[...new Set([...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family))],
        images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),
        resourceBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)})),initialMetrics});
      await page.screenshot({path:`qa/after-${width}.png`,fullPage:true});
    }
    await page.setViewportSize({width:390,height:844});
    await page.goto(base+'/vitrin48-index.html?firma=Test+Atolyesi',{waitUntil:'networkidle'});
    const interactions={};
    interactions.personalization=await page.locator('#persona').innerText();
    await page.locator('#hamburger').click();
    interactions.menuExpanded=await page.locator('#hamburger').getAttribute('aria-expanded');
    interactions.mainInert=await page.locator('main').evaluate(e=>e.inert);
    await page.keyboard.press('Escape');
    interactions.menuClosed=await page.locator('#hamburger').getAttribute('aria-expanded');
    interactions.focusReturned=await page.locator('#hamburger').evaluate(e=>e===document.activeElement);
    await page.locator('.q button').first().click();
    interactions.faqOpen=await page.locator('.q button').first().getAttribute('aria-expanded');
    await page.locator('.q button').nth(1).click();
    interactions.faqPreviousClosed=await page.locator('.q button').first().getAttribute('aria-expanded');
    await page.locator('button.legal-link').click();
    interactions.dialogOpen=await page.locator('#kvkk').evaluate(e=>e.open);
    await page.keyboard.press('Escape');
    interactions.dialogClosed=await page.locator('#kvkk').evaluate(e=>!e.open);
    interactions.formLabels=await page.locator('#contactForm input,#contactForm textarea').evaluateAll(es=>es.every(e=>e.labels.length>0));
    // Fill fields only: no form submission, external messages or bookings.
    await page.locator('#formName').fill('Test');
    interactions.validationStyle=await page.locator('#formName').evaluate(e=>e.classList.contains('valid'));
    for (const doc of ['gizlilik.html','kullanim-sartlari.html']) {
      await page.goto(base+'/'+doc,{waitUntil:'networkidle'});
      results.push(await page.evaluate(()=>({page:location.pathname,width:innerWidth,scrollWidth:document.documentElement.scrollWidth})));
    }
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const np=await nojs.newPage();await np.goto(base+'/vitrin48-index.html');
    interactions.noJsContentVisible=await np.locator('#paketler .plan').first().isVisible();
    interactions.noJsFaqVisible=await np.locator('.q .a').first().isVisible();
    interactions.noJsHero=await np.locator('h1').isVisible();
    const report={results,interactions,errors,failedRequests};
    fs.writeFileSync('qa/browser-results.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  }
  console.log(mode+' completed');
} finally { await browser?.close(); server.close(); }
