# Vitrin48 × Apple-Grade Design

## Codex için Tasarım Audit, Redesign ve Uygulama Rehberi

**Amaç:** Vitrin48'i Apple.com kopyasına çevirmek değil; mevcut marka
kimliğini koruyarak tasarım disiplinini, tipografiyi, spacing'i,
yüzeyleri, motion'ı ve premium hissi Apple-grade seviyeye yaklaştırmak.

**Ana ilke:**\
\> Apple'ın kimliğini kopyalama. Apple'ın tasarım disiplinini
Vitrin48'in kimliğine uygula.

------------------------------------------------------------------------

## 1. Projenin Tasarım Hedefi

Vitrin48 bir "generic AI SaaS landing page" gibi görünmemeli. Marka
hızlı, erişilebilir ve sonuç odaklı olmalı; buna rağmen ucuz, hazır
şablon veya amatör ajans izlenimi vermemeli.

Korunacak temel marka karakteri:

-   Koyu lacivert / siyaha yakın ana yüzeyler.
-   Turuncu Vitrin48 accent rengi.
-   "Dijital vitrin" metaforu.
-   48 saat / hızlı teslim vaadi.
-   Cesur, modern ve teknoloji odaklı görünüm.
-   Yerel işletmeler için anlaşılır, düşük sürtünmeli satış akışı.
-   Mevcut içerik ve marka tanınırlığı.

Hedef karışım:

-   **%70 Vitrin48 mevcut marka kimliği**
-   **%20 Apple-grade layout / typography / motion disiplini**
-   **%10 Liquid Glass ve özel premium efektler**

Bu oran bir tasarım kısıtı olarak ele alınmalıdır.

------------------------------------------------------------------------

## 2. Kullanılacak Referanslar

### Birincil referans --- Bowen Apple Design

Repository:

https://github.com/bowen31337/apple-design

Özellikle incelenecek dosyalar:

-   `SKILL.md`
-   `references/tokens.md`
-   `references/liquid-glass.md`
-   `references/motion-physics.md`
-   `references/gsap.md`
-   `references/typography.md`
-   `references/components.md`
-   `assets/tokens.css`
-   `assets/tailwind.css`

Bu kaynak Vitrin48 için özellikle şu konularda kullanılmalı:

1.  Design token sistemi
2.  Typography optics
3.  Liquid Glass'ın doğru kullanımı
4.  Motion physics
5.  GSAP / ScrollTrigger
6.  Surface hierarchy
7.  Component consistency

### İkincil referans --- Naplesblue Apple Design Skill

Repository:

https://github.com/naplesblue/apple-design-skill

Özellikle:

-   `review.md`
-   `checklist.md`
-   `design-system.md`
-   `patterns.md`
-   `motion.md`
-   `tokens.css`

Bu repository özellikle **audit/checklist kaynağı** olarak
kullanılmalıdır.

### Codex'e özel ek referans

https://github.com/dickwu/apple-design-skill

Bu repo Codex için doğrudan `AGENTS.md` / custom instruction kullanım
modeli de tarif ediyor. Tasarım inceleme metodolojisi için yardımcı
referans olarak kullanılabilir.

### Daha kapsamlı opsiyon

https://github.com/s1gmamale1/apple-design-skills

Bu paket Codex ve Claude Code için ayrı Apple-grade skill ailesi
sunuyor. İlk redesign için zorunlu değildir; ileride
motion/scrollytelling konusunda daha ileri iterasyon için
değerlendirilebilir.

------------------------------------------------------------------------

# 3. CODEX İÇİN ANA TALİMAT

Codex bu belgeyi uygularken şu kurala göre hareket et:

> Do not redesign Vitrin48 into an Apple clone. Preserve the Vitrin48
> brand, dark identity, orange accent, commercial positioning,
> information architecture and recognizability. Use Apple-grade design
> principles as a quality system: typography, spacing, hierarchy,
> surfaces, motion, responsiveness, accessibility and interaction
> feedback.

Aşağıdaki değişiklikler **yasaktır**:

-   Tüm siteyi Apple beyaz/gri temasına geçirmek.
-   Turuncu accent'i Apple mavisiyle değiştirmek.
-   Her component'e glass efekti uygulamak.
-   Her section'ı ayrı floating card yapmak.
-   Gereksiz gradient kullanmak.
-   Gereksiz blur kullanmak.
-   Hero'yu Apple.com'un doğrudan taklidine dönüştürmek.
-   Apple logoları, assetleri veya marka öğeleri kullanmak.
-   Mevcut Vitrin48 mesajını tasarım uğruna belirsizleştirmek.
-   Kullanıcı deneyimini sırf animasyon göstermek için yavaşlatmak.
-   Gereksiz JavaScript dependency eklemek.

------------------------------------------------------------------------

# 4. Önce Audit, Sonra Kod

Codex doğrudan redesign'a başlamamalı.

Önce mevcut Vitrin48 repository'sini incele.

Audit şu alanları kapsamalı:

### 4.1 Visual hierarchy

Kontrol et:

-   Hero'da ilk bakışta ne okunuyor?
-   "48 saat" vaadi yeterince güçlü mü?
-   Primary CTA açık mı?
-   Secondary CTA primary CTA ile yarışıyor mu?
-   Section'ların önem sırası doğru mu?
-   Kullanıcı gözünün sayfada izlemesi gereken yol belli mi?

### 4.2 Typography

Kontrol et:

-   Heading scale
-   Font weights
-   Letter spacing
-   Line height
-   Paragraph width
-   Text contrast
-   Mobile typography
-   CTA typography

Aynı role sahip metinler aynı token sistemini kullanmalı.

### 4.3 Spacing

Tespit et:

-   Rastgele padding değerleri
-   Rastgele section gaps
-   Tutarsız card padding
-   Hero'daki gereksiz boşluklar
-   Mobilde sıkışan alanlar

Spacing değerlerini merkezi sisteme taşı.

### 4.4 Surface hierarchy

Her element için şu soruyu sor:

> Bu gerçekten ayrı bir yüzey olmak zorunda mı?

Birbiriyle ilişkili sibling içerikler mümkün olduğunca ortak surface
içinde gruplanmalı.

"Her şeyi card yap" yaklaşımından kaçınılmalı.

### 4.5 Color

Vitrin48 turuncusu yalnızca anlamlı yerlerde kullanılmalı:

-   Primary CTA
-   Selected state
-   Important number
-   Active indicator
-   Marka vurgusu
-   Küçük highlight

Turuncuyu dekoratif gürültü haline getirme.

### 4.6 Glow

Mevcut glow kullanımını audit et.

Glow:

-   CTA'yı güçlendiriyorsa kullanılabilir.
-   Hero visual'da derinlik yaratıyorsa kullanılabilir.
-   Her kartın arkasında varsa azaltılmalı.
-   Metin okunabilirliğini düşürüyorsa kaldırılmalı.

Amaç:

**Neon → premium illumination**

------------------------------------------------------------------------

# 5. Vitrin48 Design Token Layer

Projede merkezi bir token sistemi oluştur.

Önerilen yapı:

``` css
:root {
  /* Brand */
  --v48-accent: ...;
  --v48-accent-hover: ...;
  --v48-accent-soft: ...;

  /* Backgrounds */
  --v48-bg: ...;
  --v48-bg-elevated: ...;
  --v48-surface: ...;
  --v48-surface-hover: ...;

  /* Text */
  --v48-text-primary: ...;
  --v48-text-secondary: ...;
  --v48-text-tertiary: ...;

  /* Borders */
  --v48-border-subtle: ...;
  --v48-border-strong: ...;

  /* Radius */
  --v48-radius-sm: ...;
  --v48-radius-md: ...;
  --v48-radius-lg: ...;
  --v48-radius-xl: ...;

  /* Spacing */
  --v48-space-1: ...;
  --v48-space-2: ...;
  --v48-space-3: ...;
  --v48-space-4: ...;
  --v48-space-5: ...;
  --v48-space-6: ...;
  --v48-space-7: ...;

  /* Shadows */
  --v48-shadow-card: ...;
  --v48-shadow-floating: ...;
  --v48-shadow-accent: ...;

  /* Motion */
  --v48-ease-standard: ...;
  --v48-ease-emphasized: ...;
}
```

**Önemli:** Apple repo'daki token değerlerini körü körüne kopyalama.

Onların **sistem mantığını** Vitrin48'e adapte et.

Kod tabanında mümkün olduğunca hard-coded:

-   color
-   radius
-   spacing
-   shadow
-   transition

değerlerini azalt.

------------------------------------------------------------------------

# 6. Typography Sistemi

Vitrin48'in typography'si "startup template" yerine ürün markası hissi
vermeli.

Önerilen semantic roller:

``` text
display-xl
display-lg
heading-xl
heading-lg
heading-md
body-lg
body-md
body-sm
label
caption
```

### Büyük başlıklar

Apple typography prensiplerinden:

-   Büyük fontlarda daha sıkı tracking.
-   Satır sayısı mümkün olduğunca düşük.
-   Gereksiz bold kullanımından kaçın.
-   Heading ile paragraph arasında güçlü kontrast oluştur.

Hero headline mobil ve desktop'ta ayrı optimize edilmeli.

Örnek:

> İşletmenizin\
> dijital vitrini.\
> **48 saatte yayında.**

Ancak mevcut copy daha güçlüyse korunmalı.

### Body

Uzun satırlardan kaçın.

Desktop body copy için kontrollü `max-width` kullan.

Amaç kullanıcıya "duvar gibi metin" göstermemek.

------------------------------------------------------------------------

# 7. Hero Redesign

Hero sitenin en önemli bölümü.

Kullanıcı 3--5 saniye içinde şunları anlamalı:

1.  Vitrin48 ne yapıyor?
2.  Kim için yapıyor?
3.  Ne kadar hızlı?
4.  Neden güvenmeliyim?
5.  Nereden başlamalıyım?

### Hero yapısı

Sol:

-   Küçük credibility/eyebrow
-   Ana headline
-   Kısa açıklama
-   Primary CTA
-   Secondary CTA veya örnekler bağlantısı
-   Mini trust row

Sağ:

-   Gerçek Vitrin48 site preview
-   Browser/device mockup
-   Floating premium composition

### Hero visual

Apple-style yaklaşım:

-   Tek güçlü obje.
-   Çok sayıda küçük floating card yok.
-   Hafif perspective/depth.
-   Controlled glow.
-   Scroll sırasında küçük transform.
-   Gereksiz 3D gösteri yok.

Visual'ın amacı:

> "Vitrin48 gerçekten güzel site yapıyor."

dedirtmek.

Sadece dekorasyon olmamalı.

------------------------------------------------------------------------

# 8. Navbar

Navbar Liquid Glass için en uygun alanlardan biri.

Önerilen:

-   Floating veya semi-floating nav
-   Hafif translucent surface
-   Background blur
-   Saturation
-   İnce hairline border
-   Çok hafif highlight
-   Scroll sonrası surface güçlenmesi

Desktop:

``` text
Vitrin48 | Örnekler | Nasıl Çalışır | Paketler | SSS | [Siteyi Başlat]
```

Mobil:

-   Logo
-   CTA
-   Menü

Navbar'da turuncuyu yalnızca CTA veya aktif state için kullan.

Glass burada gerçekten anlamlı çünkü nav içerik üzerinde hareket ediyor.

------------------------------------------------------------------------

# 9. Liquid Glass Kullanım Kuralları

Liquid Glass sadece layer overlap varsa kullan.

### Kullan

-   Navbar
-   Modal
-   Floating CTA
-   Mobile bottom sheet
-   Overlay controls
-   Gerekirse hero üzerindeki küçük floating status

### Kullanma

-   Bütün pricing cards
-   Bütün portfolio cards
-   Her section container
-   Footer
-   Uzun metin alanları
-   FAQ itemlarının tamamı

Temel prensip:

> Glass is a material, not decoration.

Liquid Glass implementasyonunda yalnızca:

``` css
backdrop-filter: blur(...)
```

yeterli kabul edilmemeli.

Gerekirse:

-   translucency
-   saturation
-   subtle rim
-   specular highlight
-   controlled shadow

birlikte kullanılmalı.

Ama performans pahasına aşırı SVG/refraction kullanılmamalı.

------------------------------------------------------------------------

# 10. "Nasıl Çalışır?" Bölümü

Bu bölüm Vitrin48'in 48 saat vaadini ürünleştirmeli.

Önerilen yapı:

``` text
01
İşletmeni anlat

02
İçerikleri gönder

03
Vitrin48 hazırlasın

04
48 saat içinde yayına çık
```

Desktop'ta scroll-driven storytelling değerlendirilebilir.

Örneğin:

-   Sol tarafta step copy
-   Sağ tarafta website preview
-   Scroll ile preview'nin değişmesi

GSAP ScrollTrigger burada kullanılabilir.

Ancak:

-   Scroll lock agresif olmamalı.
-   Mobilde basit stacked flow'a fallback yapılmalı.
-   `prefers-reduced-motion` desteklenmeli.
-   Kullanıcı içeriğe ulaşmak için animasyonu beklememeli.

------------------------------------------------------------------------

# 11. Portfolio / Örnek Siteler

Vitrin48 için portfolio kritik satış kanıtıdır.

Bu bölüm "küçük kart grid'i" gibi görünmemeli.

Daha editorial/premium yaklaşım:

### Featured project

Büyük preview:

``` text
[ WEBSITE PREVIEW ]

İşletme adı
Sektör
Teslim süresi
Öne çıkan özellikler

[Canlı Siteyi Gör]
```

Ardından diğer işler grid olarak gösterilebilir.

Hover:

-   Küçük scale
-   Shadow değişimi
-   Preview içinde minimal movement

Yasak:

-   Aşırı tilt
-   Cursor takip eden agresif spotlight
-   Her kartta farklı glow
-   Sürekli çalışan animasyonlar

Portfolio'nun görevi:

> "Benim işletmemin sitesi de böyle olabilir."

düşüncesini yaratmak.

------------------------------------------------------------------------

# 12. Pricing

Pricing mümkün olduğunca basit kalmalı.

Paket sayısı üç ise:

``` text
Başlangıç | Pro | Premium
```

veya mevcut isimler korunmalı.

Pro/recommended paket:

-   Biraz daha güçlü surface
-   İnce accent
-   Küçük "En Popüler" indicator
-   Daha güçlü CTA

Ancak diğer paketleri görsel olarak "kötü" gösterme.

### Fiyat görsel hiyerarşisi

En önemli:

`₺X.XXX`

Sonra paket adı.

Sonra kısa value proposition.

Sonra features.

Sonra CTA.

Feature listelerinde mümkün olduğunca sade icon sistemi kullan.

------------------------------------------------------------------------

# 13. CTA Sistemi

Projede CTA hiyerarşisi tanımla.

### Primary

Turuncu.

En güçlü aksiyon.

Örneğin:

**Sitemi Başlat**

### Secondary

Neutral / outline / subtle surface.

Örneğin:

**Örnekleri Gör**

### Tertiary

Text link.

Aynı section içinde birden fazla primary CTA kullanma.

Button interaction:

-   pointer-down feedback anında
-   küçük scale response olabilir
-   hover minimal
-   focus state görünür
-   disabled state net

------------------------------------------------------------------------

# 14. Motion System

Animasyonlar dekorasyon değil, hierarchy ve continuity sağlamalı.

Üç seviye tanımla.

### Level 1 --- Micro interaction

CSS yeterli:

-   Button hover
-   Focus
-   Card hover
-   Icon state
-   Link underline

### Level 2 --- Entrance

Intersection Observer veya mevcut lightweight çözüm.

-   Fade
-   Translate
-   Minimal stagger

Her section'a farklı animasyon verme.

### Level 3 --- Cinematic

GSAP yalnızca gerçekten gerekli yerlerde:

-   Hero composition
-   Featured portfolio
-   "Nasıl çalışır?" scrollytelling
-   Büyük headline reveal

### Motion prensipleri

-   Fizik hissi.
-   Ani fakat sert olmayan response.
-   Interruptible interactions.
-   Gereksiz 800--1200 ms animasyonlardan kaçın.
-   Scroll hızını kullanıcıdan alma.
-   Mobile performance'ı koru.
-   `prefers-reduced-motion` zorunlu.

------------------------------------------------------------------------

# 15. GSAP Kullanım Kararı

GSAP mevcut projede yoksa otomatik ekleme.

Önce şu soruyu cevapla:

> Bu interaction CSS / native browser API ile aynı kalitede yapılabilir
> mi?

Evet → dependency ekleme.

Hayır → GSAP değerlendir.

GSAP kullanılabilecek maksimum ana alan:

1.  Hero
2.  How It Works
3.  Featured portfolio

Bütün siteyi GSAP uygulamasına çevirme.

------------------------------------------------------------------------

# 16. Cards → Panels Dönüşümü

AI tarafından oluşturulmuş landing page'lerin en büyük problemlerinden
biri:

> Her bilgiyi ayrı kart içine koymak.

Vitrin48 audit'inde özellikle bunu ara.

Örneğin:

``` text
✓ Hızlı teslim
✓ Mobil uyumlu
✓ SEO altyapısı
✓ WhatsApp entegrasyonu
```

bunların dört ayrı glowing card olması gerekmeyebilir.

Tek unified panel içinde hairline divider ile daha premium görünebilir.

------------------------------------------------------------------------

# 17. Trust Layer

Vitrin48 henüz dev bir marka olmadığı için tasarım kadar **güven
sinyalleri** önemli.

Hero veya hero sonrası:

-   Teslim süresi
-   Yapılan site sayısı (gerçek veri varsa)
-   Gerçek müşteri örnekleri
-   Destek bilgisi
-   Sürecin şeffaflığı

**Sahte metric oluşturma.**

Örneğin veri yoksa:

`250+ işletme`

gibi rakamlar ASLA uydurulmasın.

Onun yerine gerçek value proposition kullan.

------------------------------------------------------------------------

# 18. Responsive Tasarım

Desktop tasarımın küçültülmüş versiyonunu mobile koyma.

Özellikle kontrol:

-   Hero stacking
-   CTA width
-   Navigation
-   Portfolio previews
-   Pricing cards
-   FAQ
-   Footer
-   Touch targets
-   Text wrapping

Minimum interaction target yaklaşık 44px seviyesinde tutulmalı.

Mobile'da:

-   Cinematic motion azaltılabilir.
-   Glass daha hafif olabilir.
-   Heavy backdrop effects azaltılabilir.
-   Scroll storytelling normal vertical flow'a dönüşebilir.

------------------------------------------------------------------------

# 19. Accessibility

Premium tasarım erişilebilirlik pahasına yapılmamalı.

Kontrol:

-   Contrast
-   Keyboard navigation
-   Focus-visible
-   Semantic HTML
-   `aria-*` yalnızca gerektiğinde
-   Reduced motion
-   Touch targets
-   Heading hierarchy
-   Form labels
-   Button/link distinction
-   Alt text

------------------------------------------------------------------------

# 20. Performance Budget

Apple hissi "çok efekt" demek değildir.

Codex redesign sonrasında kontrol etmeli:

-   JS bundle artışı
-   Animation libraries
-   Image sizes
-   Font loading
-   CLS
-   LCP
-   Unnecessary client components
-   Backdrop filters
-   SVG filters
-   Large videos

Öncelik:

1.  Kullanıcı algısı
2.  Hız
3.  Görsel polish
4.  Efekt

Efekt performansı bozuyorsa efekt kaldırılır.

------------------------------------------------------------------------

# 21. Conversion \> Tasarım Gösterisi

Her değişiklik şu soruyla değerlendirilmelidir:

> Bu değişiklik Vitrin48'in hizmetini daha iyi mi satıyor?

Sadece "Apple gibi görünüyor" cevabı yeterli değildir.

Öncelik sırası:

1.  Teklif netliği
2.  Güven
3.  CTA
4.  Portfolio
5.  Paketler
6.  Kullanım kolaylığı
7.  Premium his
8.  Motion / dekorasyon

------------------------------------------------------------------------

# 22. Morekod'dan Çıkarılan Ders

Vitrin48'in rakip/benchmark sitelerden kopyalaması gereken şey görsel
kimlik değil, **tasarım disiplini**.

Vitrin48'in avantajı:

-   Daha dar hizmet.
-   Daha kolay anlaşılır teklif.
-   48 saat gibi güçlü bir mekanizma.
-   Paketlenebilir hizmet.
-   Yerel işletmeye daha doğrudan hitap.

Bu nedenle site "biz her şeyi yapıyoruz" ajans sitesi gibi görünmemeli.

Vitrin48'in ana mesajı tek mermi gibi çalışmalı:

> İşletmenizin dijital vitrini. 48 saatte yayında.

------------------------------------------------------------------------

# 23. Anti-AI-Slop Checklist

Final tasarımda aşağıdakileri ara ve temizle:

-   Her yerde gradient
-   Her yerde glow
-   Her yerde glass
-   Gereksiz bento grid
-   10 farklı border radius
-   Rastgele spacing
-   Her section'da floating orb
-   Purple/blue AI gradient
-   Gereksiz "AI" ikonları
-   Aşırı rounded buttons
-   Her content'in card içinde olması
-   Generic stock illustrations
-   Sürekli hareket eden background
-   Scroll hijacking
-   Gereksiz marquee
-   Fazla badge
-   Her heading'in üstünde pill
-   Her card'ın hover'da dönmesi
-   Her section'a farklı animation
-   Decorative noise
-   Aşırı küçük gri body text

Hedef:

**Az öğe + güçlü hierarchy + kontrollü detay.**

------------------------------------------------------------------------

# 24. Uygulama Sırası

Codex redesign'ı tek dev commit halinde yapmamalı.

## Phase 0 --- Inspection

-   Repository architecture
-   Framework
-   Styling system
-   Components
-   Routes
-   Existing animations
-   Dependencies
-   Current responsive behavior

çıkar.

## Phase 1 --- Audit

`VITRIN48_DESIGN_AUDIT.md` oluştur.

Her problem için:

``` text
Severity:
Location:
Problem:
Why it matters:
Recommended fix:
Reference:
```

kullan.

Severity:

-   P0 --- Conversion/usability blocker
-   P1 --- Major visual/system issue
-   P2 --- Polish
-   P3 --- Optional experiment

## Phase 2 --- Foundations

-   Tokens
-   Typography
-   Container
-   Spacing
-   Buttons
-   Surfaces
-   Shadows
-   Focus states

## Phase 3 --- Core sections

Sırayla:

1.  Navbar
2.  Hero
3.  Trust layer
4.  How It Works
5.  Portfolio
6.  Pricing
7.  FAQ
8.  Final CTA
9.  Footer

## Phase 4 --- Motion

Temel UI tamamlanmadan motion ekleme.

## Phase 5 --- Responsive

Desktop, tablet, mobile.

## Phase 6 --- Accessibility

Keyboard + reduced motion + contrast.

## Phase 7 --- Performance

Bundle + image + animation.

## Phase 8 --- Visual QA

Sayfayı gerçek browser'da incele.

------------------------------------------------------------------------

# 25. Codex'in İlk Turda Yapmaması Gerekenler

İlk çalıştırmada:

-   Tüm siteyi yeniden yazma.
-   Framework değiştirme.
-   Routing değiştirme.
-   Backend'e dokunma.
-   Form logic'i değiştirme.
-   Analytics'i kaldırma.
-   SEO metadata'yı bozma.
-   Working componentleri sebepsiz yeniden oluşturma.
-   Yeni UI library ekleme.
-   Shadcn veya başka kit'i sırf kolay diye projeye sokma.
-   Apple assets kullanma.

Önce audit + plan.

------------------------------------------------------------------------

# 26. Codex İçin Başlangıç Promptu

Aşağıdaki prompt bu MD ile beraber kullanılabilir:

``` text
You are acting as the senior product designer and frontend design engineer for Vitrin48.

Read this entire Vitrin48 Apple-Grade Design document before making changes.

Then inspect the complete repository.

IMPORTANT:
Do not immediately redesign or rewrite the application.

First perform a design and frontend architecture audit.

Use these repositories as design references where applicable:

1. https://github.com/bowen31337/apple-design
2. https://github.com/naplesblue/apple-design-skill
3. https://github.com/dickwu/apple-design-skill

The goal is NOT to make Vitrin48 look like Apple.

The goal is to preserve Vitrin48's own identity while applying Apple-grade discipline to:
- typography
- spacing
- hierarchy
- surface design
- interaction feedback
- motion
- responsiveness
- accessibility
- visual consistency

Preserve:
- Vitrin48 branding
- dark/navy identity
- orange accent
- 48-hour positioning
- existing business proposition
- existing working functionality

Avoid:
- generic AI SaaS aesthetics
- excessive glassmorphism
- excessive glow
- excessive gradients
- card fragmentation
- unnecessary animation
- unnecessary dependencies

STEP 1:
Inspect the repository.

STEP 2:
Create VITRIN48_DESIGN_AUDIT.md.

For every issue include:
- severity
- exact component/file
- current problem
- why it matters
- proposed solution
- expected visual/conversion impact

STEP 3:
Create VITRIN48_REDESIGN_PLAN.md.

Organize the implementation into small reversible phases.

STEP 4:
Before changing code, summarize:
- what should remain untouched
- what should be refined
- what should be redesigned
- what should be removed
- which Apple-design principles are relevant
- which Apple-design principles should NOT be used

Do not implement the redesign until the audit and plan are complete.

When implementation begins, prioritize:
clarity > conversion > trust > consistency > accessibility > performance > visual effects.

The final result should feel like:
"Vitrin48 designed by an excellent product design team"

NOT:
"Vitrin48 trying to imitate Apple."
```

------------------------------------------------------------------------

# 27. İkinci Aşama Implementation Prompt

Audit'i gördükten ve onayladıktan sonra:

``` text
Proceed with the approved Vitrin48 redesign plan.

Work incrementally.

For every phase:
1. state the files you will modify,
2. implement the smallest coherent change,
3. verify responsive behavior,
4. verify existing functionality,
5. verify accessibility,
6. visually inspect the result,
7. report what changed.

Do not introduce unrelated refactors.

Use the Vitrin48 token layer as the single source of truth for:
- colors
- spacing
- radii
- shadows
- typography
- motion

Use Liquid Glass only for genuinely overlapping floating surfaces.

Use orange as a meaningful brand accent, not decoration.

Prefer unified surfaces over fragmented cards.

Keep motion restrained and functional.

Do not sacrifice performance for visual effects.

At the end compare the result against the original design and explicitly explain:
- what became clearer,
- what became more premium,
- what became more consistent,
- what conversion improvements were made,
- what was intentionally left unchanged.
```

------------------------------------------------------------------------

# 28. Definition of Done

Redesign tamamlanmış sayılmadan önce:

### Brand

-   [ ] Vitrin48 hâlâ Vitrin48 gibi görünüyor.
-   [ ] Turuncu marka accent'i korunuyor.
-   [ ] Dark identity korunuyor.
-   [ ] Apple clone görünümü yok.

### Hierarchy

-   [ ] 48 saat vaadi hemen anlaşılabiliyor.
-   [ ] Primary CTA açık.
-   [ ] Hero 3--5 saniyede anlaşılabiliyor.
-   [ ] Portfolio görünür ve ikna edici.
-   [ ] Pricing anlaşılır.

### Design System

-   [ ] Token layer var.
-   [ ] Rastgele spacing ciddi ölçüde azaltıldı.
-   [ ] Radius sistemi tutarlı.
-   [ ] Shadow sistemi tutarlı.
-   [ ] Typography semantic.

### Effects

-   [ ] Glass yalnızca anlamlı yüzeylerde.
-   [ ] Glow kontrollü.
-   [ ] Gradient kontrollü.
-   [ ] Motion kontrollü.

### UX

-   [ ] Mobile iyi.
-   [ ] Keyboard navigation çalışıyor.
-   [ ] Focus states var.
-   [ ] Reduced motion destekleniyor.
-   [ ] CTA'lar açık.

### Performance

-   [ ] Gereksiz dependency eklenmedi.
-   [ ] Heavy animation mobilde sorun yaratmıyor.
-   [ ] Görseller optimize.
-   [ ] Layout shift kontrol altında.

### Conversion

-   [ ] Hizmet net.
-   [ ] Süreç net.
-   [ ] Güven unsurları net.
-   [ ] Paket farkları net.
-   [ ] Kullanıcı sonraki adımı biliyor.

------------------------------------------------------------------------

# 29. Nihai Tasarım Prensibi

Vitrin48'in hedefi:

> "Apple gibi görünmek" değil.

Hedef:

> **Küçük işletmelere web sitesi satan bir markanın, beklenenden çok
> daha iyi tasarlanmış ve çok daha güvenilir görünmesi.**

Apple-design kaynakları bunun için bir **kalite sistemi** olarak
kullanılmalıdır.

Vitrin48'in kendi marka karakteri ise son tasarımın merkezinde
kalmalıdır.

**Clarity first.\
Conversion second.\
Restraint always.\
Motion with purpose.\
Brand over imitation.**
