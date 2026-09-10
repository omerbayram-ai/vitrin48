# Vitrin48 tasarım ve frontend audit'i

Tarih: 11 Eylül 2026. İncelenen temel: `demo-revizyonu`, `e2d03b2`.
Mevcut site, tasarım değişikliklerinden önce bu commit ile GitHub'a push edildi.

## Kapsam ve doğrulama sınırı

Ana satış yüzeyi `vitrin48-index.html`: HTML, gömülü CSS ve vanilla JavaScript. Framework, paket manifesti, build pipeline veya backend uygulaması yok. Tasarımın ana müdahale noktası bu dosyanın CSS'i ve bölüm işaretlemesi.

Ana sayfanın kaynak kodu, altı demonun mimari/bağımlılık envanteri, iki yasal sayfa ve `legal.css` incelendi. Demoların tüm iş akışları çalıştırılmadı. PDF ve DOCX iş belgeleri uygulama kodu değildir; içerikleri bu audit'in kapsamı dışında. `.climpire` ve `.climpire-worktrees` yerel araç/çalışma alanlarıdır; site yedeğine katılmadı ve değiştirilmedi. Kök ve üst dizinlerde uygulanacak bir AGENTS.md bulunmadı.

Tarayıcı bağlantısı denendi; runtime `No browser is available`, keşif `[]` döndürdü. Bu nedenle bulgular kaynak koduna dayanır. Ekran görüntüsü, gerçek cihaz taşması, klavye akışı, LCP/CLS ve canlı iletişim teslimatı doğrulanmış değildir. Görsel QA uygulama öncesi ve sonrası açık kabul kriteridir.

## Mimari envanteri

| Yüzey | Yapı ve bağımlılıklar | Karar |
|---|---|---|
| Ana sayfa, yaklaşık 78 KB | Manrope + Unbounded Google Fonts; Calendly widget; inline CSS/JS; canvas, IntersectionObserver, sayaçlar | Mevcut HTML yapısında kademeli iyileştirme |
| demo1 / demo2, yaklaşık 72 / 71 KB | Restoran / oto servis; bağımsız HTML, birer form, responsive CSS ve reduced-motion kuralları | Sektörel kimlik ve işlevleri koru |
| demo3 / demo4, yaklaşık 124 / 145 KB | Saç atölyesi / hukuk; bağımsız HTML, birer form, responsive kurallar | Ana site tokenlarını zorla yayma |
| demo5 / demo6, yaklaşık 176 / 173 KB | Mimarlık / klinik; üçer form, GSAP 3.12.5, ScrollTrigger, Lenis 1.1.14 CDN | Ana sayfa iframe maliyetini azalt; demoları yeniden yazma |
| gizlilik.html / kullanim-sartlari.html | Ortak legal.css; statik içerik, ana siteye dönüş bağlantıları | Görsel token paylaşımı; metinleri tasarım için değiştirme |

Ana sayfa sırası: hero → sektör marquee → faydalar → altı adım → paketler + Signature + bakım → sektörler → altı demo → SSS → iletişim → footer. Ana sayfada GSAP yoktur. Form, Formspree ayarı doldurulmadığında WhatsApp'a yönlendirir. `?firma=` kişiselleştirmesi, KVKK dialog'u, FAQ, mobil menü ve aktif navigasyon mevcut.

## Korunması gereken güçlü taraflar

- Lacivert zemin, sıcak turuncu vurgu, vitrin simgesi ve yerel işletme odağı ayırt edici.
- Ücretsiz analiz düşük sürtünmeli mevcut satış adımı; doğrudan satın alma CTA'sına dönüştürülmemeli.
- Paket fiyatları, kapsam, ödeme ve revizyon şartları görünür; FAQ teslim süresini açıklıyor.
- Altı demo gerçek yerel HTML sayfaları; tasarım kanıtı üretmek için yeni hayali müşteri gerekmez.
- Body 17px, kontrollü paragraf genişliği, responsive grid'ler, form accessible-name'leri, FAQ aria-expanded ve CSS reduced-motion başlangıcı mevcut.
- Glass çoğunlukla header/overlay/dialog ile sınırlı; pricing kartları zaten opak. Burada yaygın glass sorunu uydurulmamalı.

## Bulgular

### A01 — İletişim hedefleri hazır değil

Severity: P0 — canlı dönüşüm engeli.
Location: `vitrin48-index.html:1194` CONFIG; `:1433` başarı fonksiyonu; `:1448` WhatsApp fallback; `:1149` Calendly.
Problem: Form adresi YOUR_FORM_ID, WhatsApp 905000000000. WhatsApp penceresi açılınca gerçek gönderim doğrulanmadan teşekkür/dönüş sözü gösteriliyor. Calendly linkinin href'i boş; widget yüklenmezse alternatif hedef yok.
Why it matters: Kullanıcı talebini ilettiğini sanabilir; lead alınmayabilir.
Recommended fix: Gerçek iletişim bilgilerini ayrı operasyonel adımda doğrula. WhatsApp hazırlama ile gönderim durumunu ayır; Calendly için gerçek href fallback'i kullan. Rehberin ilk turda form mantığını koruma kuralı nedeniyle bu audit'te davranış değiştirilmedi.
Expected impact: Yanlış başarı algısının giderilmesi ve ulaşılabilir iletişim yolu.
Reference: Yerel rehber §17, §21, §25.

### A02 — 48 saat vaadinin kapsamı hero'da belirsiz

Severity: P1.
Location: `vitrin48-index.html:774` hero, `:785` sayaçlar, `:898` Kurumsal, `:914` Premium, `:1092` SSS.
Problem: Hero 48 saati genelliyor; paketler 1–2, 3–5 ve 7–10 gün. Ana başlık hizmeti soru üzerinden anlatıyor; doğrudan teslim vaadi başlıkta yok.
Why it matters: Güçlü teklif geç anlaşılıyor ve yanlış beklenti doğabilir.
Recommended fix: Başlık önerisi: “İşletmenizin dijital vitrini. 48 saatte yayında.” Yakınındaki açıklama: “Başlangıç paketinde, içerikleriniz hazır olduğunda. Çok sayfalı projelerde süre pakete göre belirlenir.” Yerel işletmelere web sitesi yapıldığı ilk paragrafta açıkça yazılsın.
Expected impact: Hizmet, hedef kitle ve süre aynı bakışta anlaşılır; kapsam korunur.
Reference: Yerel rehber §7, §10, §17, §21.

### A03 — Mobilde dekorasyon teklifin önüne geçiyor

Severity: P1.
Location: `vitrin48-index.html:295` .shopwrap order:-1; `:232` mobil nav; `:201` hamburger.
Problem: 900px altında illüstrasyon metinden önce; 760px altında nav CTA'sı da gizli. Hamburger yaklaşık 40×34px CSS kutusuyla 44px hedefin altında.
Why it matters: Dar ekranda ilk görünen içerik hizmet ve başlatma adımı olmayabilir.
Recommended fix: Mobil sıra başlık → açıklama → CTA → güven → preview; header logo + kısa analiz CTA'sı + 44px menü düğmesi.
Expected impact: İlk ekranda anlaşılabilir teklif ve daha kolay dokunma.
Reference: Yerel rehber §8, §18; Bowen typography/components.

### A04 — Hero görseli iş kalitesini göstermiyor

Severity: P1.
Location: `vitrin48-index.html:793` .shopwrap / SVG.
Problem: Vitrin metaforu güçlü ama animasyonlu çizim yapılan siteleri göstermiyor.
Why it matters: Kullanıcı hizmet sonucunu hayal etmek zorunda kalıyor.
Recommended fix: Mevcut demo1'den alınmış optimize, sabit boyutlu bir browser preview; açık “Örnek tasarım” etiketi ve çalışan demo bağlantısı. Vitrin işareti marka imzası olarak korunmalı. Hayali müşteri veya teslim metriği eklenmemeli.
Expected impact: Ürün kalitesi teklifin hemen yanında görünür.
Reference: Yerel rehber §7, §11.

### A05 — Tokenlar yalnızca kısmi

Severity: P1.
Location: `vitrin48-index.html:79` :root, `:336` section, `:384` .plan, `:538` case varyantları; `legal.css:3`.
Problem: Renk değişkenleri var; spacing/type/motion/shadow rolleri yok. 3/10/16/18/22/24/28/999px gibi rolü belirsiz radius'lar ve 13/14/18/22/26/30px gibi bağımsız boşluklar var. Calendly'de --text, --text-muted, --accent tanımsız.
Why it matters: Aynı markaya ait parçalar farklı sistemlerden gelmiş görünüyor; bakım zorlaşıyor.
Recommended fix: `vitrin48-tokens.css` ile --v48-* rolleri, eski isimlerden kontrollü alias geçişi. Unbounded/Manrope korunarak semantic type scale; container ve spacing ortaklaştırma. Tanımsız değişkenleri rol tokenlarına bağlama.
Expected impact: Tutarlılık ve daha az tekrar; framework değişikliği gerekmez.
Reference: [Bowen tokens](https://github.com/bowen31337/apple-design/blob/main/references/tokens.md), [typography](https://github.com/bowen31337/apple-design/blob/main/references/typography.md).

### A06 — Fazla ve uzun hareket

Severity: P1.
Location: `vitrin48-index.html:120` blob, `:251` eyebrow, `:279` SVG, `:322` marquee, `:346` reveal, `:390` plan shine, `:625` WhatsApp ring, `:1220` canvas.
Problem: 120px blur'lı sabit bloblar, neon flicker, tekrar eden çizim, marquee, halka, dönen pricing ışığı aynı sayfada. Reveal 800ms + 500ms'e kadar stagger; sayaç 1400ms.
Why it matters: Bilgiyi gölgeler, sürekli render maliyeti yaratır ve içerik bekletir.
Recommended fix: Dekoratif döngüleri kaldır; hero'da tek statik ışık. Reveal 160–240ms opacity/8–12px translate, düşük stagger; primary içerik başlangıçtan görünür. Ana sayfaya GSAP/Lenis ekleme.
Expected impact: Daha sakin ve hızlı hissedilen arayüz; gerçek performans kazancı ölçülecek.
Reference: [Bowen motion](https://github.com/bowen31337/apple-design/blob/main/references/motion-physics.md); yerel rehber §14–15, §23.

### A07 — Reduced motion ve JS kapalı durum eksik

Severity: P1.
Location: `vitrin48-index.html:718`, `:1283`, `:1311`, `:1494`; .reveal `:347`.
Problem: CSS azaltılmış hareket desteği var; JavaScript sayaçları ve explicit smooth scroll aynı tercihi kontrol etmiyor. .reveal başlangıçta opacity:0; JavaScript devreye girmezse içerik görünmez. Hero sayaçları kaynakta sıfır.
Why it matters: Erişilebilirlik tercihi tam uygulanmıyor; hata halinde satış içeriği kayboluyor.
Recommended fix: İçerik HTML'de görünür ve gerçek değerleriyle başlasın; animasyon progressive enhancement olsun. JS smooth scroll matchMedia tercihini izlesin. Sayıları animasyonsuz kullan.
Expected impact: İçeriğe beklemeden ve hata durumlarında erişim.
Reference: Yerel rehber §14, §19; Bowen motion/verification.

### A08 — Yüzeyler ve turuncu vurgu birbirleriyle yarışıyor

Severity: P1.
Location: `vitrin48-index.html:355` .steps, `:479` .sectors, `:556` .faq, `:427` .signature.
Problem: Altı süreç, sekiz sektör ve sekiz FAQ ayrı kartlar; numara, süre badge'i, hover çizgisi ve gölge tekrarları. Signature ve bakım da yoğun vurgu taşıyor.
Why it matters: Aynı önemdeki içerikler yapay olarak bölünüyor, primary CTA'nın farkı azalıyor.
Recommended fix: Sürecin mevcut altı adımını tek panelde ayırıcılarla tut; sektörleri sade liste/grid yap; FAQ'yı ortak yüzeyde satırlara çevir. Signature ve bakım kapsamını koruyarak görsel ağırlığını azalt.
Expected impact: Daha rahat tarama, daha belirgin teklif hiyerarşisi.
Reference: [Naplesblue checklist](https://github.com/naplesblue/apple-design-skill/blob/main/checklist.md), [patterns](https://github.com/naplesblue/apple-design-skill/blob/main/patterns.md); yerel rehber §16.

### A09 — Portfolio hem küçük hem pahalı

Severity: P1.
Location: `vitrin48-index.html:500` .demos; `:984` .iframe-sim; `:994`, `:1007`, `:1020`, `:1034`, `:1047`, `:1060` iframe'ler.
Problem: Altı iframe eager yükleniyor, title yok. Her biri 400% boyutun 0.25 ölçeğinde; metin okunurluğu sınırlı. Demo5/6 ayrıca animasyon kütüphaneleri getiriyor. Demo HTML'leri toplam yaklaşık 761 KB; bu transfer ölçümü değildir, font/CDN dahil değildir.
Why it matters: En önemli tasarım kanıtı küçük kalırken alt sayfalar yükleme maliyeti getiriyor.
Recommended fix: Bir featured demo + kalan örnekler. Gerçek demodan optimize screenshot thumbnail, açık demo linki, width/height; fold altı görseller lazy. Screenshot üretilemezse geçici lazy iframe + title; bunu nihai performans çözümü diye sunma.
Expected impact: Daha büyük görsel kanıt, daha az eşzamanlı belge/JS yükü.
Reference: Yerel rehber §11, §20.

### A10 — Aynı işlevin görsel dili değişiyor

Severity: P2.
Location: `vitrin48-index.html:538` case--starter/corporate/premium; `:175` .btn; `:1139` WhatsApp; `:1150` Calendly.
Problem: Portfolio çerçeveleri 10/3/24px radius, farklı badge ve border dili kullanıyor. İletişim bölümünde form, WhatsApp ve takvim benzer primary ağırlıkta. background-color override'ı ana .btn gradient'ini kaldırmıyor.
Why it matters: Sektörel farkın preview'dan okunması yerine ana site çerçevesi değişiyor; sonraki adım belirsizleşiyor.
Recommended fix: Ortak browser çerçevesi; farklılığı gerçek demolar taşısın. Analiz primary, WhatsApp secondary, takvim tertiary. Hover en fazla 2px; anlık active feedback korunur.
Expected impact: Marka bütünlüğü ve tek anlaşılır başlangıç.
Reference: Yerel rehber §12–13; Bowen components.

### A11 — Klavye ve form sunumu eksikleri

Severity: P1.
Location: `vitrin48-index.html:764` hamburger, `:1371` menü handler'ı, `:1122` form, `:1175` dialog; `legal.css`.
Problem: Global :focus-visible sistemi yok; browser varsayılanına bırakılmış. Menü aria-expanded/controls, Escape, odak dönüşü ve overlay arkasındaki odak davranışı tanımlı değil. Formların aria-label'ları var ama kalıcı görünür label yok. Dialog erişilebilir adla ilişkilendirilmemiş.
Why it matters: Menü durumunu ve form alanını takip etmek zorlaşır.
Recommended fix: Görünür odak halkası, 44px hedefler, menü durum/odak/Escape yönetimi, görünür label, dialog aria-labelledby. Form payload ve gönderim mantığı korunur.
Expected impact: Klavyeyle ve yardımcı teknolojilerle anlaşılır kullanım.
Reference: Yerel rehber §19; [Dickwu review](https://github.com/dickwu/apple-design-skill/blob/main/SKILL.md).

### A12 — Güven ifadelerinin kanıtı depoda yok

Severity: P1.
Location: `vitrin48-index.html:783` hero-stats, `:790` counter-badge, `:894` recommended tag.
Problem: “ortalama teslim”, “<2sn”, “ilk 5 müşterimize” ve “En çok tercih edilen” için veri kaynağı bulunmadı. Bu, iddiaların yanlış olduğunun kanıtı değildir; doğrulanmamış olduklarını gösterir.
Why it matters: Tasarım güveni ölçülmemiş metriklerle sağlamaya çalışmamalı.
Recommended fix: Doğrulanana kadar teslim kapsamı, mobil uyum, açık fiyat, yazılı süreç gibi mevcut hizmet nitelikleriyle değiştir; “Önerilen” kullan. Demo örneklerini gerçek müşteri sonucu gibi sunma.
Expected impact: Daha somut ve savunulabilir güven katmanı.
Reference: Yerel rehber §17.

### A13 — Semantik kapsam ve footer bütünlüğü

Severity: P2.
Location: `vitrin48-index.html:770` main, `:826` kapanışı, `:1157` footer; `gizlilik.html`, `kullanim-sartlari.html`.
Problem: main yalnız hero'yu kapsıyor. Diğer ana içerik landmark dışında. Footer ayrı yasal sayfalara bağlantı vermiyor; yalnız dialog var. Sayfaların font/spacing rolleri ayrı tanımlı.
Why it matters: Sayfa yapısı ve gezinme bütünlüğü zayıflıyor.
Recommended fix: main tüm asıl bölümleri kapsasın, skip link ekle; mevcut dialog korunarak yasal sayfalara açık link ver. Ortak görsel tokenlar kullan, yasal metin değişikliği yapma.
Expected impact: Daha tutarlı navigasyon ve landmark yapısı.
Reference: Yerel rehber §19, §25.

### A14 — Materyal ve kontrast doğrulaması eksik

Severity: P2.
Location: `vitrin48-index.html:141` header, `:211` overlay, `:415` .plan li.no; `legal.css`.
Problem: Header blur+saturation temeli uygun; üst kenar ışığı/fallback tokenı yok. Mobilde yalnız prefixesiz blur düşürülüyor. Azaltılmış transparency ve arttırılmış contrast kuralları yok. Opacity .75 verilen ikincil metin ayrıca ölçülmeli.
Why it matters: Glass arkadan geçen içeriğe göre okunurluğu değiştirebilir.
Recommended fix: Yalnız nav/overlay'de sınırlı materyal; opak fallback, eşleşen WebKit kuralı ve tercih desteği. Body contrast 4.5:1, büyük metin 3:1 hedefiyle gerçek bileşik renkleri ölç.
Expected impact: Efektin okunabilirliği koruması; düşük güçlü cihazlar için daha hafif seçenek.
Reference: [Bowen liquid glass](https://github.com/bowen31337/apple-design/blob/main/references/liquid-glass.md).

## Referansların uygulanma sınırı

Bowen'in SKILL.md, token, glass, motion, GSAP, typography, components ve CSS varlıkları; Naplesblue'nun review/checklist/design-system/patterns/motion/tokens kaynakları; Dickwu'nun review becerisi incelendi. Bunlar tasarım referanslarıdır, projeye kurulum yapılmadı.

Naplesblue'nun turuncuyu Apple mavisine çeviren ve beyaz/gri zemini zorunlu tutan örnekleri bu proje için uygulanmaz. Kullanıcının rehberi üstündür. Bowen'in Tailwind köprüsü ve GSAP tarifleri mevcut vanilla ana sayfaya dependency eklemek için gerekçe değildir. Benimsenecekler: semantic tokenlar, optik tipografi, anlamlı yüzey, düşük hareket, görünür odak ve doğrulanabilir tasarım kanıtı.

## Öncelik kararı

Önce gerçek iletişim yapılandırması ayrı olarak netleştirilmeli; tasarım uygulaması için foundations → navbar/hero → süreç/portfolio → pricing/FAQ/CTA → motion → responsive/a11y/performance sırası izlenmeli. Dönüşüm artışı tasarım hipotezidir; analitik veya deney olmadan ölçülmüş sonuç diye sunulamaz.
