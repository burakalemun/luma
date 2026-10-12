import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TRENDYOL_STORE_URL,
  HEPSIBURADA_STORE_URL,
  TrendyolIcon,
  HepsiburadaIcon,
  InstagramIcon,
} from "@/components/ui/MarketplaceBrand";
import { getInstagramPosts } from "@/lib/instagram";
import { getBlogPosts } from "@/lib/blog";
import { getLocalProductImage } from "@/lib/images";

export const instant = false;

export default async function Home() {
  const [{ posts: instagramPosts }, latestBlogPosts] = await Promise.all([
    getInstagramPosts(),
    getBlogPosts(),
  ]);
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
          <div className="flex flex-wrap items-center gap-2.5 mt-7">
            <span className="text-[11px] text-muted-foreground uppercase tracking-[0.12em] font-semibold mr-1">
              RESMİ MAĞAZALAR:
            </span>
            <a
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F27A1A]/10 hover:bg-[#F27A1A] text-[#F27A1A] hover:text-white border border-[#F27A1A]/30 text-[12px] font-semibold shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <TrendyolIcon className="w-3.5 h-3.5 fill-current" color="currentColor" />
              <span>Trendyol Mağazamız</span>
              <span className="material-symbols-outlined text-[13px] opacity-70 group-hover:translate-x-0.5 transition-transform">east</span>
            </a>
            <a
              href={HEPSIBURADA_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6000]/10 hover:bg-[#FF6000] text-[#FF6000] hover:text-white border border-[#FF6000]/30 text-[12px] font-semibold shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <HepsiburadaIcon className="w-3.5 h-3.5 fill-current" color="currentColor" />
              <span>Hepsiburada Mağazamız</span>
              <span className="material-symbols-outlined text-[13px] opacity-70 group-hover:translate-x-0.5 transition-transform">east</span>
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
              <div className="w-11 h-11 rounded-full bg-secondary/10 p-1.5 flex items-center justify-center shrink-0">
                <img src="/images/logo-mark.png" alt="The Luma" className="w-full h-full object-contain" />
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
                slug: "luma-warm-hug",
                title: "Luma Warm Hug",
                badge: "EN ÇOK SATAN",
                badgeBg: "bg-primary",
                desc: "Boyun ve omuz bölgesi için tasarlanmış doğal keten ısı yastığı. Derin doku rahatlaması sağlar.",
                img: getLocalProductImage("luma-warm-hug", "/images/products/luma-warm-hug.png"),
                trendyolUrl: TRENDYOL_STORE_URL,
                hbUrl: HEPSIBURADA_STORE_URL,
              },
              {
                slug: "luma-touch-cherry",
                title: "Luma Touch Cherry",
                badge: "YENİ",
                badgeBg: "bg-secondary",
                desc: "Göz çevresi için tasarlanmış uyku ve migren terapi maskesi. Işığı tamamen bloke eder.",
                img: getLocalProductImage("luma-touch-cherry", "/images/products/luma-touch-cherry.jpg"),
                trendyolUrl: TRENDYOL_STORE_URL,
                hbUrl: HEPSIBURADA_STORE_URL,
              },
              {
                slug: "luma-ritual-box",
                title: "LUMA Ritual Box",
                badge: "RİTÜEL KUTUSU",
                desc: "Kiraz çekirdekli göz maskesi, lavantalı soya mumu, çiçek çayı ve Spotify listesiyle bütünsel arınma ritüeli.",
                img: getLocalProductImage("luma-ritual-box", "/images/products/luma-ritual-box.jpg"),
                trendyolUrl: TRENDYOL_STORE_URL,
                hbUrl: HEPSIBURADA_STORE_URL,
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
                    <Link href={`/urunler/${product.slug}`} className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1 group/link">
                      Ürünü İncele
                      <span className="material-symbols-outlined text-[14px] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200">east</span>
                    </Link>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={product.trendyolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Trendyol'da Satın Al"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-8 rounded-full bg-[#F27A1A] hover:bg-[#D66308] text-white px-3.5 text-[11.5px] font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                      >
                        <TrendyolIcon className="w-3.5 h-3.5 fill-white" color="#ffffff" />
                        <span>Trendyol</span>
                      </a>
                      <a
                        href={product.hbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Hepsiburada'da Satın Al"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-8 rounded-full bg-[#FF6000] hover:bg-[#E05300] text-white px-3.5 text-[11.5px] font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                      >
                        <HepsiburadaIcon className="w-3.5 h-3.5 fill-white" color="#ffffff" />
                        <span>Hepsiburada</span>
                      </a>
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
            <a
              href="https://instagram.com/thelumaa_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border/80 bg-card hover:bg-gradient-to-r hover:from-[#fdf497]/15 hover:via-[#fd5949]/15 hover:to-[#d6249f]/15 hover:border-[#d6249f]/50 hover:text-[#d6249f] text-foreground rounded-[14px] h-[48px] px-6 shadow-xs hover:shadow-md font-semibold text-[13.5px] transition-all duration-300 self-start md:self-auto group"
            >
              <InstagramIcon className="w-4 h-4 text-muted-foreground group-hover:text-[#d6249f] transition-colors" />
              <span>@thelumaa_</span>
              <span className="material-symbols-outlined text-[17px] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                open_in_new
              </span>
            </a>
          </div>

          {instagramPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 md:p-16 rounded-[28px] bg-card border border-border/40 text-center max-w-[800px] mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#fdf497]/20 via-[#fd5949]/20 to-[#d6249f]/20 flex items-center justify-center mb-6 border border-[#d6249f]/30">
                <InstagramIcon className="w-8 h-8 text-[#d6249f]" />
              </div>
              <h3 className="font-serif text-[28px] font-semibold text-foreground mb-3">
                Doğal Yaşam Ritüellerini Keşfedin
              </h3>
              <p className="text-[15.5px] text-muted-foreground leading-[1.7] max-w-[500px] mb-8 font-light">
                Ürün yapım aşamaları, termoterapi rehberleri ve rahatlatıcı anlar için bizi resmi Instagram sayfamızdan takip edin.
              </p>
              <a
                href="https://instagram.com/thelumaa_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-[13px] font-semibold tracking-wider uppercase rounded-full shadow-md hover:opacity-95 transition-all hover:scale-[1.02]"
              >
                <InstagramIcon className="w-4 h-4 fill-none" color="#ffffff" />
                @thelumaa_ Sayfasına Git
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {instagramPosts.map((media, idx) => (
                <a
                  key={media.id || idx}
                  href={media.url || "https://instagram.com/thelumaa_"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-muted shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${media.hiddenOnTablet ? "hidden lg:block" : ""}`}
                >
                  <img src={media.img} alt={media.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1510]/85 via-[#1b1510]/15 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">
                      {media.type === "reel" ? "play_arrow" : "photo_library"}
                    </span>
                  </div>
                  <div className="absolute top-3.5 left-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      <InstagramIcon className="w-4 h-4 fill-none" color="#ffffff" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[12.5px] font-medium leading-[1.45] line-clamp-2 mb-2">{media.title}</p>
                    {media.type === "reel" && media.views && (
                      <div className="flex items-center gap-1 text-[10.5px] text-white/75 font-semibold tracking-wider">
                        <span className="material-symbols-outlined text-[14px]">play_circle</span>
                        {media.views}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── BLOG PREVIEW ────────────────────────────────────────── */}
      {latestBlogPosts.length > 0 && (
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
              {latestBlogPosts.slice(0, 3).map((post, idx) => (
                <Link
                  key={idx}
                  href={`/blog/${post.slug}`}
                  className="group block bg-background rounded-[28px] overflow-hidden shadow-sm hover:shadow-[0_16px_48px_rgba(30,20,10,0.08)] transition-all duration-500 border border-border/40 hover:-translate-y-1"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 flex flex-col h-[210px]">
                    <Badge
                      variant="outline"
                      className="w-fit text-[10px] uppercase tracking-wider text-primary border-primary/30 bg-primary/5 rounded-full px-3 py-1 mb-4 font-semibold"
                    >
                      {post.category}
                    </Badge>
                    <h3 className="font-serif text-[21px] font-semibold text-foreground leading-[1.3] line-clamp-2 mb-auto group-hover:text-[#B95B32] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[12px] text-muted-foreground font-medium">
                        {post.author || "The Luma"}
                      </span>
                      <span className="material-symbols-outlined text-primary text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        east
                      </span>
                    </div>
                  </div>
                </Link>
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
      )}

      {/* ─── BRAND QUOTE STRIP ───────────────────────────────────── */}
      <section className="relative w-full bg-secondary py-28 md:py-36 flex flex-col items-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

        <img
          src="/images/logo-mark-white.png"
          alt="The Luma Logo"
          className="h-20 w-auto object-contain mb-8 relative z-10 opacity-90 drop-shadow-sm hover:opacity-100 transition-opacity"
        />
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
