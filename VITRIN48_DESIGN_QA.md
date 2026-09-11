# Vitrin48 uygulama ve doğrulama raporu

12 Eylül 2026. Kullanıcının plan onayı sonrasında uygulandı.

## Sonuç

Lacivert/turuncu kimlik, vitrin logosu ve Manrope/Unbounded korundu. Hero artık web sitesi hizmetini ve 48 saat vaadini doğrudan anlatıyor; Başlangıç paketi/içerik hazırlığı koşulu yakınında. Ücretsiz analiz primary, örnekler secondary aksiyon.

Gerçek altı demodan alınan JPEG önizlemeler kullanıldı. Altı eager iframe kaldırıldı; alt bölüm görselleri lazy yükleniyor. İlk ve son örnek geniş yatay sunumda, diğerleri ortak çerçevede. Demoların HTML dosyaları değiştirilmedi.

Ortak token katmanı, ayrı component stylesheet, tutarlı buton/boşluk/yüzey sistemi eklendi. Süreç paneli ve FAQ satırları ortaklaştırıldı. Pricing fiyat/kapsamları korundu; önerilen paketin vurgusu sadeleştirildi. Hareketli blob, canvas tozu, marquee, neon flicker, çizim döngüsü, sayaçlar, pricing parlaması ve WhatsApp halkası kaldırıldı. Glass yalnız navbar'da; yeni animasyon kütüphanesi yok.

Mobil sıralama metin/CTA/güven/preview olarak düzenlendi. Menü expanded state, focus isolation, Tab döngüsü, Escape ve focus return kazandı. Formlara görünür label eklendi; mobil iletişim alanında sabit düğmeler formun üstüne binmiyor. FAQ progressive enhancement ile JS kapalıyken cevaplarını gösteriyor. Main landmark tüm içeriği kapsıyor; skip link ve yasal sayfa linkleri var.

## Görsel kanıt

- [Önce — desktop](qa/before-1440.png), [önce — mobil](qa/before-390.png)
- [Sonra — desktop hero](qa/hero-1440.png), [sonra — mobil hero](qa/hero-390.png)
- [Paketler](qa/paketler-1440.png), [örnekler](qa/ornekler-1440.png)
- [Mobil iletişim](qa/iletisim-390.png), [mobil menü ve focus](qa/mobile-menu.png)
- [Tüm sayfa — desktop](qa/after-1440.png), [tüm sayfa — mobil](qa/after-390.png)

Bağlı Browser runtime mevcut değildi. Yerel Chrome, Playwright Core üzerinden headless olarak kullanıldı. İlk sandbox koşusunda dış kaynaklar engellendi; ağ izniyle baseline, demo görselleri ve final testler gerçek fontlarla tekrar alındı. Son koşuda ağ isteği hatası yok. Bölüm screenshot'larında sabit navbar/WhatsApp/skip link yalnız capture sırasında gizlenir; normal viewport screenshot'larında gerçek davranış görünür. Lazy görsellerin yüklenmesi scroll ve decode ile beklenir.

## Kontrol sonuçları

| Kontrol | Sonuç |
|---|---|
| 1440 / 1024 / 768 / 390 / 320px | Yatay taşma yok; tüm yerel görseller yüklü |
| Gerçek fontlar | Manrope ve Unbounded yüklü |
| JS runtime / ağ | Son final koşuda hata yok |
| Menü klavye döngüsü, Escape, focus return | Geçti |
| FAQ aç/kapat, öncekinin kapanması | Geçti |
| KVKK dialog açma / Escape | Geçti |
| Form label ilişkileri / mevcut valid stili | Geçti; gönderim yapılmadı |
| ?firma= kişiselleştirmesi | Geçti |
| JS kapalı hero / paketler / FAQ içeriği | Görünür |
| Reduced motion | Çalışan animasyon yok |
| Yüksek kontrast | Navbar opak fallback aktif |
| %200 CSS zoom | Yatay taşma yok; gerçek browser zoom/OS text scaling yerine sınırlı simülasyon |
| Yasal sayfalar 320 / 390px | Taşma yok |
| Calendly | Widget fonksiyonu yüklü; gerçek href fallback var; randevu oluşturulmadı |
| SEO metadata ve structured data | Yedekle aynı |
| Form gönderim mantığı | Yedekle aynı |
| Fiyat / teslim süresi / paket özellikleri | Yedekle aynı |
| Altı demo kaynak dosyası | Yedekle aynı |
| Yerel asset/link/anchor, ID ve CSS variable kontrolü | Geçti |
| Inline JS/JSON syntax ve git diff whitespace | Geçti |

Makine çıktıları: [browser-results.json](qa/browser-results.json), [extended-results.json](qa/extended-results.json), [static-results.json](qa/static-results.json).

## Kontrast ve performans

Token renklerinden hesaplanan kontrast: ana metin 16.88:1; surface üstünde secondary 8.18:1, tertiary 6.71:1; primary button 10.96:1. Bu değerler düz yüzey çiftleridir; her olası üçüncü taraf widget veya kompozit piksel için tam erişilebilirlik sertifikası değildir.

Ana HTML, normalize LF kaynak karşılaştırmasında 76.7 KB'den 41.4 KB'ye indi. Stil dosyaları ve ortak legal.css birlikte yaklaşık 29 KB; CSS çıkarıldığı için yalnız HTML küçülmesi transfer kazancı diye yorumlanmamalı. Önizlemeler 60.0–82.2 KB, toplam yaklaşık 443 KB. Hero ile portfolio aynı demo1 dosyasını paylaşır. Sayfanın başlangıcında diğer beş demo belgesi ve bunların animasyon bağımlılıkları yüklenmez.

Yerel Chrome ölçümünde 1440px ilk görünüm LCP 1048 ms, CLS 0. Sonraki viewport'larda aynı browser context/cache ile LCP 84–448 ms, CLS 0. Bunlar localhost, throttling uygulanmamış ve reduced-motion açık laboratuvar gözlemleridir; gerçek mobil ağ/cihaz saha sonucu veya Lighthouse skoru değildir. Resource Timing byte alanları cross-origin kaynaklarda eksik olabileceği için tam ağ bütçesi olarak kullanılmaz. Mobil Safari, fiziksel Android/iPhone ve screen reader ile manuel test yapılmadı.

## Korunan operasyonel sınırlar

CONFIG içindeki WhatsApp numarası `905000000000`, Formspree kimliği `YOUR_FORM_ID` olarak duruyor. Gerçek bilgiler sağlanmadı; kullanıcı adına uydurulmadı. WhatsApp fallback'inin mevcut başarı mesajı davranışı da form mantığını koruma kapsamında değiştirilmedi. Bu yüzden tasarım tamamlanmış olsa da gerçek lead teslimatı/yayına hazırlık onaylanmış değildir. Calendly'nin doğrudan href fallback'i, script yüklenmediğinde erişilebilir bir alternatif sağlar.

Fiyat, ödeme/revizyon şartları, SEO, demo işlevleri ve yasal metinler değiştirilmedi. Dönüşüm iyileşmeleri net teklif, görünür örnekler ve daha belirgin CTA üzerinden tasarım hipotezidir; A/B testi veya ölçülmüş satış artışı iddia edilmez.

## Yeniden çalıştırma

Yalnız yerel QA için (siteye runtime dependency eklemez):

```powershell
npm install --prefix .qa-tools --no-save --package-lock=false playwright-core
node tools/v48-static-check.mjs
node tools/v48-browser-qa.mjs verify
node tools/v48-browser-qa.mjs extended
```

Scriptler yerel Chrome yolunu kullanır ve yalnız görev süresince localhost HTTP sunucusu açar. `baseline` modu e2d03b2'yi görüntüler ve demo screenshot'larını yeniden üretir; ihtiyaç yokken çalıştırılmaz. Form gönderimi, WhatsApp mesajı veya randevu oluşturulmaz. `.qa-tools` Git dışında tutulur.

Eski hâl GitHub'da `e2d03b2` ile yedeklidir. Uygulama ayrı yerel commit'lerle kaydedildi; yeni tasarım bu çalışma sırasında yayınlanmadı.
