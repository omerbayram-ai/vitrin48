# Vitrin48 kademeli redesign planı

Tarih: 11 Eylül 2026. Temel yedek: `e2d03b2`, GitHub `demo-revizyonu`.
İlgili audit: [VITRIN48_DESIGN_AUDIT.md](VITRIN48_DESIGN_AUDIT.md).

Durum: Audit ve plan hazır. Uygulama kodu değiştirilmedi. Kullanıcının eklediği rehberin §27 “Audit'i gördükten ve onayladıktan sonra” koşulu gereği ikinci aşama plan onayından sonra başlayacak.

## Tasarım kararı

Yaklaşık %70 mevcut Vitrin48, %20 tipografi/layout/hareket disiplini, %10 kontrollü materyal. Koyu lacivert, sıcak turuncu, vitrin simgesi, Unbounded/Manrope ailesi ve yerel işletme dili korunacak.

Korunacak: Mevcut URL'ler ve section ID'leri, fiyat/kapsam/teslim koşulları, ücretsiz analiz akışı, form payload/endpoint mantığı, ?firma= kişiselleştirmesi, demo kimlikleri, SEO metadata ve structured data, mevcut entegrasyonlar. Analytics varsa kaldırılmayacak; audit'te bağımsız bir analytics yükleyicisi saptanmadı.

İyileştirilecek: Tipografi rolleri, spacing, CTA farkı, nav materyali, klavye kullanımı, paket okunurluğu ve gerçek teslim kapsamı.

Yeniden tasarlanacak: Hero'nun gerçek demo preview kompozisyonu; featured portfolio; süreç ve FAQ'nın ortak yüzey düzeni; mobil içerik sırası.

Kaldırılacak: Hareketli blob/canvas tozu, marquee hareketi, neon flicker/tekrar eden çizim, dönen pricing ışığı, CTA shine taraması, sürekli WhatsApp halkası, gereksiz hover tilt ve veri kaynağı olmayan metriklerin metrik sunumu. Marka sembolü korunacak.

Uygulanmayacak: Beyaz Apple teması, mavi accent, Apple asset/font kopyalama, her yere glass, yeni framework/UI kit/Tailwind, GSAP veya Lenis'in ana sayfaya taşınması, scroll kilitleme ve sırf gösteri için sinematik akış.

## Somut hedef kompozisyonu

- Navbar: mevcut anchor hedefleri; desktop görünür linkler ve tek analiz CTA'sı. Mobil logo, kısa “Analiz İste” bağlantısı, 44px menü kontrolü. İnce rim, hafif highlight ve scroll sonrası artan opaklık.
- Hero: “İşletmenizin dijital vitrini. 48 saatte yayında.” Başlangıç paketi ve içerik teslimi koşulu aynı görüş alanında. Primary “İşletmemi Ücretsiz Analiz Et”, secondary “Örnekleri Gör”. Tek gerçek demo browser preview'su; açık demo etiketi. Mobilde metin önce.
- Güven: Paket başlangıç fiyatı, mobil uyum ve yazılı süreç gibi mevcut bilgiler. Sayaç animasyonu ve kanıtsız istatistik yok.
- Süreç: Mevcut altı adım korunur; tek ortak yüzeyde numara/metin/ince ayırıcı. Mobil normal dikey akış. Sırf rehber örneği dört adım diye gerçek süreç silinmez.
- Portfolio: Örnekler anchor'ı korunur. Featured olarak demo1 önerilir; mevcut gerçek tasarımdan statik görsel ve demo linki. Diğer beş demo ortak çerçevede. Hayali müşteri, teslim saati veya performans metriği yazılmaz.
- Paketler: ₺5.000 / ₺9.000 / ₺15.000 ve 1–2 / 3–5 / 7–10 gün korunur. Ortadaki öneri ince accent ile ayrılır. Signature ve ₺500/ay bakım görünür, daha sakin ikincil sunumda kalır.
- FAQ: Mevcut sorular/cevaplar ortak yüzeyde. Klavye çalışması ve expanded ilişkileri korunur/güçlendirilir.
- Son CTA: Analiz formu primary; WhatsApp secondary; takvim daha düşük görsel ağırlıkta. Görünür label eklenir, gönderim mantığı değiştirilmez.
- Footer: Vitrin48, iletişim, mevcut anchor'lar, yasal sayfa linkleri ve KVKK erişimi.

İlk uygulamada bölüm sırası korunacak. Portfolio'ya hero'dan doğrudan erişim ve kendi bölümünde featured düzen sağlanacak; bilgi mimarisini topluca yeniden sıralamak bu planın parçası değil.

## Faz 0 — Başlangıç kanıtları

Dosyalar: audit/plan; `qa/` altında önce/sonra görüntüleri ve doğrulama notu.

Yapılacak: Tarayıcı erişimi sağlandığında 1440, 1024, 768, 390 ve 320px genişliklerde mevcut görünümü kaydet. Hero, portfolio, pricing, footer, mobil menü ve iletişim bölümünü kontrol et. Temel resource boyutları ve ağ yükünü kaydet.

Kabul: Her screenshot'ın viewport'u belli; ölçüm yapılmayan metrik açıkça boş. Yerel HTTP sunucu kullanılır; gönderim veya randevu oluşturulmaz. Mevcut tarayıcı runtime'ında bağlantı olmadığı için bu adım henüz yapılmadı.

## Faz 1 — Foundations

Dosyalar: yeni `vitrin48-tokens.css`; `vitrin48-index.html`; `legal.css`.

En küçük değişiklik: --v48-accent, accent-hover/soft; bg/elevated/surface/hover; text-primary/secondary/tertiary; border-subtle/strong; radius-sm/md/lg/xl; space-1…7; shadow-card/floating/accent; ease-standard/emphasized rolleri. Font ve type semantic rolleri: display-xl/lg, heading-xl/lg/md, body-lg/md/sm, label, caption. Eski renk değişkenleri geçici alias olur; yeni kullanım tokena bağlanır.

Başlangıç değerleri: Mevcut #0A0E15, #FFB454/#FF8A1E, #F5EFE3 korunur; 4/8px tabanlı boşluk ailesi; 8/12/18/24px radius rolleri; tek container ve responsive gutter. Optik tracking yalnız heading rollerinde; metin okunurluğu kontrast ölçümüyle seçilir. Numaralarda tabular-nums.

Kabul: Ana sayfa ve yasal sayfalar aynı marka ailesi; tanımsız değişken yok; tüm link/button'larda focus-visible, 44px kontrol hedefi; 320px'te taşma yok; işlevsel JS ve SEO değişmemiş. Faz ayrı commit.

## Faz 2 — Navbar, hero ve güven

Dosyalar: `vitrin48-index.html`, gerekirse yeni `vitrin48-design.css`, `assets/previews/` altında gerçek demo screenshot'ı.

En küçük değişiklik: Navbar materyali, mobil CTA ve odak davranışı; net başlık ve süre koşulu; gerçek demo preview; mevcut fiyatı statik gösterim; güven metinleri. Snapshot genişlik/yükseklik oranı sabit. Hero görseli lazy yüklenmez; LCP adayı gereksiz geciktirilmez.

Kabul: İlk ekranda ne/kim/hız/başlangıç anlaşılır; mobil metin önce; menü Escape ile kapanır ve odağı döndürür; dış içerik menü açıkken uygunsuz odak almaz. ?firma=, primary CTA ve eski anchor'lar çalışır. Desktop/mobil önce-sonra görüntüsü; ayrı commit.

## Faz 3 — Süreç, portfolio ve yüzeyler

Dosyalar: `vitrin48-index.html`, `vitrin48-design.css`, `assets/previews/`.

En küçük değişiklik: Altı süreç adımı panel/divider yapısı; sektörlerde sade sunum; bir featured demo ve kalan örnekler. Altı eager iframe yerine optimize gerçek screenshot görselleri. Demoların kendisi bu fazda değiştirilmez.

Kabul: Altı demo linki doğru, demo etiketleri açık; görsel ve hedef aynı demo; alt görseller loading=lazy ve intrinsic boyutlu. Yeni preview başına hedef ≤150 KB, hero için ≤200 KB (ölçümle değerlendirilecek bütçe). Statik thumbnail üretimi henüz mümkün değilse kalıcıymış gibi raporlanmaz. Mobilde yatay taşma ve okunamayacak kadar küçük preview yok. Ayrı commit.

## Faz 4 — Pricing, FAQ, iletişim ve footer

Dosyalar: `vitrin48-index.html`, `vitrin48-design.css`, `legal.css`.

En küçük değişiklik: Fiyat/isim/değer/özellik/CTA hiyerarşisi; önerilen paket için sakin vurgu; Signature ve bakım ikincil. FAQ ortak yüzey; görünür form label'ları; footer yasal linkleri; main landmark ve skip link.

Kabul: Fiyatlar, gün aralıkları, özellikler, ödeme ve revizyon şartları diff ile birebir karşılaştırılır. Form ID, alanlar, payload ve kişiselleştirme korunur. FAQ aç/kapat, KVKK dialog, nav ve yasal dönüş linkleri çalışır. Gönderim yapılmaz. Ayrı commit.

## Faz 5 — Hareket ve azaltılmış efekt

Dosyalar: `vitrin48-index.html`, `vitrin48-design.css`, token dosyası.

En küçük değişiklik: Kullanılmayan dekor DOM/CSS/JS birlikte temizlenir; null referans bırakılmaz. Native IntersectionObserver ile kısa, tek tip progressive entrance; sayfa başlangıçta görünür. Mikro etkileşimler CSS; reduced-motion JS scroll için de uygulanır. Nav'da transparency/contrast ve opak fallback.

Kabul: Yeni runtime dependency yok. Animasyon kapalıyken içerik ve CTA eksiksiz. Menü/FAQ etkileşimi kullanıcıyı bekletmez; arka planda dekoratif render döngüsü kalmaz. JS kapalıyken ana teklif ve linkler görünür. Ayrı commit.

## Faz 6 — Responsive, erişilebilirlik, performans ve görsel QA

Dosyalar: Gereken minimal düzeltmeler ve `VITRIN48_DESIGN_QA.md`.

Kontroller:

1. 1440/1024/768/390/320px, ayrıca %200 zoom; başlık sarımı, menü, CTA, portfolio, pricing, FAQ ve footer taşması.
2. Tab/Shift+Tab, Enter/Space, Escape; görünür odak, doğru odak dönüşü ve hiçbir klavye kapanı olmaması.
3. Reduced motion, mümkünse reduced transparency/high contrast; animasyon beklemeden bilgi görünmesi.
4. Body 4.5:1, büyük metin 3:1 kontrast; glass üzerindeki son renkler ve disabled durumları ayrıca.
5. Altı demo, anchor'lar, kişiselleştirme, FAQ, dialog, form alanları; gerçek lead/randevu göndermeden yerel kontrol.
6. Baseline'a karşı JS/CSS/görsel transferi; özellikle iframe kaynaklı GSAP/Lenis yükünün ana sayfadan kalkması. Yeni kütüphane yok. LCP ≤2.5s ve CLS ≤0.1 hedef; cihaz/ağ/profil belirtilmeden skor vaat edilmez.
7. Browser console hatası, eksik yerel asset, bozuk bağlantı, invalid CSS değişkeni, metadata/structured data regresyonu kontrolü.
8. Önce/sonra ekran görüntüleriyle marka, açıklık, yüzey tutarlılığı ve mobil kullanım karşılaştırması. Tarayıcı kontrolü tamamlanmadan görsel QA veya Definition of Done tamamlandı denmez.

Kabul: Her kontrol geçti/kaldı/ölçülmedi şeklinde somut kanıtla raporlanır. Uygun olan statik kontroller çalıştırılır; düşük etkili CSS değişiklikleri için uygulamayı taklit eden gereksiz unit test yazılmaz.

## Ayrı operasyonel takip — tasarım kapsamında sessizce değiştirilmeyecek

Audit A01 için gerçek WhatsApp numarası ve kullanılacak form hedefi gerekir. Form mantığı, başarının anlamı ve Calendly fallback'i bu girdilerle ayrı küçük değişiklik olarak ele alınmalı. Veri veya müşteri sayısı uydurulmaz. Gerçek yapılandırma olmadan “iletişim çalışıyor” veya “yayına hazır” denmez. Bu durum görsel foundations çalışmasının başlamasını engellemez.

## Geri dönüş ve teslim

Her faz öncesi dosyalar ve hedef belirtilir; tamamlandığında kontrol ve değişiklik sonucu kaydedilir. Uygulama küçük commit'lere ayrılır; tek dev commit yapılmaz. Geri dönüş destructive reset yerine ilgili fazı revert ederek yapılır. Eski site GitHub commit `e2d03b2` üzerinden kalıcı olarak bulunabilir. Kullanıcının bu turdaki push isteği eski hâlin yedeğidir; yeni tasarımın yayınlandığı varsayılmaz.

Final rapor: Ne netleşti, ne daha tutarlı/premium oldu, dönüşüm için ne değişti, ne korundu ve hangi kontroller ölçülemedi. Dönüşüm iyileşmesi ölçülmediyse hipotez olarak kalır.
