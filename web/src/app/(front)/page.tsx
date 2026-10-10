import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center overflow-hidden">

        {/* Left */}
        <div className="lg:col-span-6 flex flex-col justify-center relative z-10 pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-secondary/60" />
            <p className="text-[11px] uppercase tracking-[0.1em] text-secondary font-bold">
              DOĞAL ISI TERAPİSİ
            </p>
          </div>
          <h1 className="font-serif text-[44px] md:text-[60px] lg:text-[66px] font-semibold text-foreground leading-[1.05] tracking-[-0.03em] max-w-[580px]">
            Doğanın<br className="hidden sm:block" /> Sıcaklığını<br className="hidden sm:block" />
            <span className="text-primary">Bedeninize</span> Taşıyın
          </h1>
          <p className="text-[16.5px] md:text-[17.5px] text-muted-foreground leading-[1.8] max-w-[460px] mt-6 font-light">
            Geleneksel kiraz çekirdeği termoterapisi ve organik keten kumaşlarla
            bedeninizi dinlendirin. Her ürün özenle el yapımı.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-10">
            <Link href="/urunler">
              <Button className="w-full sm:w-auto bg-[#B95B32] hover:bg-[#A34F2A] text-white rounded-[14px] h-[52px] px-8 text-[15px] font-semibold transition-all duration-300 shadow-lg shadow-[#B95B32]/25 hover:shadow-xl hover:shadow-[#B95B32]/35 hover:-translate-y-0.5">
                Ürünleri İncele
                <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
              </Button>
            </Link>
            <Link href="/hakkimizda">
              <Button variant="ghost" className="w-full sm:w-auto text-foreground hover:bg-muted/50 rounded-[14px] h-[52px] px-6 text-[15px] transition-all">
                Hikayemizi Oku
              </Button>
            </Link>
          </div>

          {/* Marketplace Links */}
          <div className="flex flex-row items-center gap-3 mt-7 opacity-90">
            <span className="text-[11px] text-muted-foreground uppercase tracking-[0.08em] font-semibold">SATIN AL:</span>
            <a href="#" className="text-[13px] text-[#C87C3A] font-semibold hover:underline flex items-center gap-1 group">
              Trendyol
              <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">east</span>
            </a>
            <span className="text-muted-foreground/50">·</span>
            <a href="#" className="text-[13px] text-[#B86B35] font-semibold hover:underline flex items-center gap-1 group">
              Hepsiburada
              <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">east</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-12 pt-8 border-t border-border/60">
            {[
              { icon: "eco", text: "%100 Doğal" },
              { icon: "handyman", text: "El Yapımı" },
              { icon: "local_shipping", text: "Hızlı Teslimat" },
            ].map((trust, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[12px] uppercase tracking-[0.07em] text-muted-foreground font-semibold">
                <span className="material-symbols-outlined text-secondary text-[18px]">{trust.icon}</span>
                {trust.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hero Image */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center mt-4 lg:mt-0">
          <div className="absolute top-10 right-0 lg:-right-10 w-[320px] h-[320px] rounded-full bg-primary/10 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[260px] h-[260px] rounded-full bg-secondary/10 blur-[70px] pointer-events-none" />

          <div className="relative w-full max-w-[500px] group">
            <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(30,20,10,0.12)] relative">
              <img
                src="/hero.jpg"
                alt="The Luma – Doğal Isı Terapisi"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1510]/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-6 -left-4 md:-left-12 z-20 bg-card/95 backdrop-blur-xl border border-white/20 rounded-[20px] shadow-[0_20px_40px_rgba(30,20,10,0.15)] p-4 pr-8 flex flex-row items-center gap-3 transition-transform duration-500 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[20px]">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-foreground tracking-tight">Doğal Kiraz Çekirdeği</span>
                <span className="text-[12.5px] text-muted-foreground mt-0.5">Geleneksel Isıl Terapi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────── */}
      <section className="w-full bg-muted/50 py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-[540px]">
              <p className="text-[11px] uppercase tracking-[0.1em] text-secondary font-bold mb-3">ÜRÜNLERİMİZ</p>
              <h2 className="font-serif text-[38px] md:text-[46px] font-semibold text-foreground leading-[1.1]">
                El Yapımı Terapi <br className="hidden md:block" />Koleksiyonu
              </h2>
            </div>
            <Link href="/urunler" className="text-[14px] text-primary flex items-center gap-1.5 hover:underline font-semibold group pb-2">
              Tümünü Keşfet
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Luma Warm Hug",
                badge: "EN ÇOK SATAN",
                badgeBg: "bg-primary",
                desc: "Boyun ve omuz bölgesi için tasarlanmış doğal keten ısı yastığı. Derin doku rahatlaması sağlar.",
                img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Luma Touch Cherry",
                badge: "YENİ",
                badgeBg: "bg-secondary",
                desc: "Göz çevresi için tasarlanmış uyku ve migren terapi maskesi. Işığı tamamen bloke eder.",
                img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
              },
              {
                title: "Luma Balance",
                badge: null,
                desc: "Meditasyon pratikleriniz ve bel desteği için mükemmel denge sağlayan destek minderi.",
                img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop",
              },
            ].map((product, idx) => (
              <div key={idx} className="bg-card border border-border/30 rounded-[28px] shadow-[0_4px_24px_rgba(30,20,10,0.04)] hover:shadow-[0_16px_56px_rgba(30,20,10,0.10)] transition-all duration-500 overflow-hidden group flex flex-col p-0 m-0">
                <div className="relative w-full aspect-[4/3] bg-[#EBE3D9] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  {product.badge && (
                    <Badge className={`absolute top-4 left-4 ${product.badgeBg} text-white text-[10.5px] uppercase tracking-[0.07em] px-3 py-1.5 rounded-full border-none shadow-sm`}>
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="15" height="15" viewBox="0 0 20 20" fill="#C5947A" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[13px] text-foreground font-semibold ml-1">4.8</span>
                  </div>
                  <h3 className="font-serif text-[23px] font-semibold text-foreground mb-2">{product.title}</h3>
                  <p className="text-[14px] text-muted-foreground line-clamp-2 leading-[1.7]">{product.desc}</p>

                  <div className="w-full h-[1px] bg-border/60 my-5" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Link href="/urunler" className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1 group/link">
                      Ürünü İncele
                      <span className="material-symbols-outlined text-[14px] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200">east</span>
                    </Link>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button size="sm" className="w-full sm:w-auto h-8 rounded-full bg-[#B95B32] hover:bg-[#A34F2A] text-white px-4 text-[12px] font-bold shadow-sm transition-colors">
                        Trendyol
                      </Button>
                      <Button size="sm" className="w-full sm:w-auto h-8 rounded-full bg-[#A34F2A] hover:bg-[#8F4423] text-white px-4 text-[12px] font-bold shadow-sm transition-colors">
                        HB
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY LUMA ────────────────────────────────────────────── */}
      <section className="w-full bg-background py-24 md:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.1em] text-secondary font-bold mb-3">NEDEN LUMA?</p>
            <h2 className="font-serif text-[38px] md:text-[46px] font-semibold text-foreground leading-[1.1]">
              Doğallık, El Emeği, Şifa
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "eco", title: "%100 Doğal İçerik", desc: "Sentetik madde, katkı veya kimyasal içermez. Sadece doğanın saf ürünleri." },
              { icon: "handyman", title: "El Yapımı Üretim", desc: "Her ürün, Türkiye'de usta eller tarafından tek tek özenle hazırlanır." },
              { icon: "thermostat", title: "Isı & Soğuk Terapi", desc: "Hem sıcak hem soğuk uygulamalara uygun, çift yönlü terapi imkânı." },
              { icon: "favorite", title: "İyileştirici Etki", desc: "Kas gevşemesi, ağrı giderimi ve derin rahatlama için bilimsel temelli tasarım." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-start gap-4 p-7 bg-card rounded-[24px] border border-border/40 hover:shadow-[0_8px_32px_rgba(30,20,10,0.06)] transition-shadow duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[22px]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[16.5px] text-foreground mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[13.5px] text-muted-foreground leading-[1.7]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM ───────────────────────────────────────────── */}
      <section className="w-full bg-muted/40 py-24 md:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-14 gap-6">
            <div className="max-w-[480px]">
              <p className="text-[11px] uppercase tracking-[0.1em] text-secondary font-bold mb-3">SOSYAL MEDYA</p>
              <h2 className="font-serif text-[38px] md:text-[46px] font-semibold text-foreground leading-[1.1]">
                Instagram&apos;da Keşfet
              </h2>
              <p className="text-[15.5px] text-muted-foreground mt-4 leading-[1.7]">
                Wellness rutinlerimiz, ürün yapım aşamaları ve rahatlama ritüelleri için bize katılın.
              </p>
            </div>
            <a href="https://instagram.com/thelumaa_" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center border border-border text-foreground hover:bg-muted rounded-[14px] h-[48px] px-6 shadow-sm font-medium text-[14px] transition-colors self-start md:self-auto">
              @thelumaa_
              <span className="material-symbols-outlined ml-2 text-[17px]">open_in_new</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { type: "reel", title: "Luma Warm Hug nasıl kullanılır?", views: "12K", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop" },
              { type: "post", title: "Kiraz çekirdeği termoterapisinin faydaları", views: null, img: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=600&auto=format&fit=crop" },
              { type: "reel", title: "Uyku ritüelinizi dönüştürün", views: "8.5K", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop" },
              { type: "post", title: "Ritual Box kutu açılışı (Unboxing)", views: null, img: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=600&auto=format&fit=crop" },
              { type: "reel", title: "5 dakikada zihin dinginliği molası", views: "15K", hiddenOnTablet: true, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" },
            ].map((media, idx) => (
              <a
                key={idx}
                href="https://instagram.com/thelumaa_"
                target="_blank"
                rel="noreferrer"
                className={`group relative block w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-muted shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${media.hiddenOnTablet ? "hidden lg:block" : ""}`}
              >
                <img src={media.img} alt={media.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1510]/85 via-[#1b1510]/15 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <span className="material-symbols-outlined text-[18px]">
                    {media.type === "reel" ? "play_arrow" : "photo_library"}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[12.5px] font-medium leading-[1.45] line-clamp-2 mb-2">{media.title}</p>
                  {media.type === "reel" && (
                    <div className="flex items-center gap-1 text-[10.5px] text-white/75 font-semibold tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">play_circle</span>
                      {media.views}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ────────────────────────────────────────── */}
      <section className="w-full bg-card py-24 md:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.1em] text-secondary font-bold mb-3">BLOG</p>
            <h2 className="font-serif text-[38px] md:text-[46px] font-semibold text-foreground leading-[1.1] mb-2">
              Wellness Dünyasından
            </h2>
            <p className="text-[16px] text-muted-foreground max-w-[440px] leading-[1.7] mt-4">
              İyileşme, doğallık ve yaşam kalitesi hakkında içgörüler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                tag: "#KirazÇekirdeği",
                title: "Kiraz Çekirdeğinin Şaşırtıcı Faydaları",
                date: "14 Eki 2024",
                read: "4 dk",
                img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop",
              },
              {
                tag: "#UykuKalitesi",
                title: "Derin Bir Uyku İçin Gece Ritüelleri",
                date: "02 Eki 2024",
                read: "5 dk",
                img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop",
              },
              {
                tag: "#Meditasyon",
                title: "5 Dakikada Zihninizi Sakinleştirin",
                date: "28 Eyl 2024",
                read: "3 dk",
                img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop",
              },
            ].map((post, idx) => (
              <a key={idx} href="/blog" className="group block bg-background rounded-[28px] overflow-hidden shadow-sm hover:shadow-[0_16px_48px_rgba(30,20,10,0.08)] transition-all duration-500 border border-border/40 hover:-translate-y-1">
                <div className="relative w-full h-[220px] overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <div className="p-7 flex flex-col h-[210px]">
                  <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wider text-primary border-primary/30 bg-primary/5 rounded-full px-3 py-1 mb-4 font-semibold">
                    {post.tag}
                  </Badge>
                  <h3 className="font-serif text-[21px] font-semibold text-foreground leading-[1.3] line-clamp-2 mb-auto group-hover:text-[#B95B32] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[12px] text-muted-foreground font-medium">{post.date} · {post.read} okuma</span>
                    <span className="material-symbols-outlined text-primary text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      east
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/blog">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted rounded-[14px] h-[50px] px-9 text-[14.5px] font-semibold transition-all hover:-translate-y-0.5">
                Tüm Yazıları Oku
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRAND QUOTE STRIP ───────────────────────────────────── */}
      <section className="relative w-full bg-secondary py-28 md:py-36 flex flex-col items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

        <span className="material-symbols-outlined text-white/25 text-[44px] mb-8 relative z-10">spa</span>
        <h2 className="font-serif italic text-[38px] md:text-[54px] text-[#FDFAF7] leading-[1.15] max-w-[820px] relative z-10">
          &quot;Sıcaklık iyileştirir,<br className="hidden md:block" /> doğa dengeler.&quot;
        </h2>
        <p className="text-[17px] text-white/65 mt-8 max-w-[580px] font-light leading-[1.75] relative z-10">
          Her ürünümüz, yoğun günlerin ardından bedeninize ve zihninize hak ettiği molayı vermek için özenle elde üretilir.
        </p>
        <Link href="/hakkimizda" className="relative z-10">
          <Button className="mt-12 bg-transparent border border-white/40 text-white hover:bg-white hover:text-secondary rounded-[14px] h-[52px] px-9 text-[14.5px] font-semibold transition-all duration-300">
            Hikayemizi Keşfet
          </Button>
        </Link>
      </section>

    </div>
  );
}
