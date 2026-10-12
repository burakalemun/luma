import Link from "next/link";
import { notFound } from "next/navigation";
import { productsDb } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import { TrendyolIcon, HepsiburadaIcon } from "@/components/ui/MarketplaceBrand";
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  Package,
  Gift,
  Flame,
  Snowflake,
  ChevronRight,
  ArrowRight,
  Heart,
} from "lucide-react";

export function generateStaticParams() {
  return productsDb.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const product = productsDb.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products (exclude current)
  const otherProducts = productsDb
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-24 md:pt-28 pb-32 selection:bg-[#B95B32]/20">
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-12">
        
        {/* BREADCRUMB - Clean, subtle and container-aligned */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[12px] tracking-wide text-stone-500 font-medium mb-6"
        >
          <Link href="/" className="hover:text-[#B95B32] transition-colors">
            Anasayfa
          </Link>
          <span className="text-stone-300">/</span>
          <Link href="/urunler" className="hover:text-[#B95B32] transition-colors">
            Koleksiyon
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-[#4A3F35] font-semibold">{product.title}</span>
        </nav>

        {/* MAIN PRODUCT DETAIL GRID (SPACIOUS HERO SHOWCASE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE GALLERY (Uncluttered, Spacious & Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <ProductGallery
              images={product.images}
              title={product.title}
              badge={product.badge}
              badgeBg={product.badgeBg}
            />
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO & LUXURY MARKETPLACE BUY BOX */}
          <div className="lg:col-span-5 flex flex-col pt-1">
            
            {/* BADGE & SUBTITLE */}
            <div className="flex items-center gap-2.5 mb-2.5">
              {product.badge && (
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white ${product.badgeBg || "bg-[#4A3F35]"}`}>
                  {product.badge}
                </span>
              )}
              <span className="text-[11px] uppercase tracking-widest text-[#B95B32] font-semibold">
                {product.subtitle}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="font-serif text-[34px] md:text-[42px] text-[#2C241E] leading-[1.15] tracking-tight mb-3">
              {product.title}
            </h1>

            {/* SHORT DESCRIPTION */}
            <p className="text-[15px] text-[#554A41] leading-[1.7] font-light mb-6">
              {product.shortDesc}
            </p>

            {/* ORGANİK VE ÇİFT KATLI VURGUSU */}
            {product.isHeated && (
              <div className="bg-[#FAF4ED] border border-[#B95B32]/15 rounded-xl p-3.5 mb-6 space-y-1.5">
                <p className="text-[12px] text-[#4A3F35] font-medium leading-relaxed flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B95B32] shrink-0" />
                  <span>Ürünlerimiz tamamen organik ve el işçiliğiyle üretilmiştir.</span>
                </p>
                <p className="text-[12px] text-[#4A3F35] font-medium leading-relaxed flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B95B32] shrink-0" />
                  <span>Çift katmanlı tasarımı sayesinde dış kılıf çıkarılıp yıkanabilir.</span>
                </p>
              </div>
            )}

            {/* LUXURY MARKETPLACE BUY BOX */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#E7DFD5] shadow-[0_4px_20px_rgba(74,63,53,0.04)] mb-6">
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100 mb-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A3F35]">
                  <ShieldCheck className="w-4 h-4 text-[#B95B32]" />
                  <span>Resmi Satış Noktaları</span>
                </div>
                <span className="text-[11px] font-medium text-stone-400">
                  Orijinal LUMA Güvencesi
                </span>
              </div>

              <p className="text-[13px] text-stone-600 font-light mb-3.5 leading-relaxed">
                Ürünlerimizi güvenli ödeme, taksit seçenekleri ve hızlı teslimat avantajıyla resmi mağazalarımızdan sipariş verebilirsiniz:
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-2.5">
                {/* TRENDYOL BUTTON */}
                <a
                  href={product.trendyolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#F27A1A] to-[#E06606] hover:from-[#E06606] hover:to-[#C85500] text-white shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <TrendyolIcon className="w-4 h-4 fill-white" color="#ffffff" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13.5px] font-bold tracking-wide">
                        Trendyol ile Satın Al
                      </span>
                      <span className="text-[11px] text-white/80 font-normal">
                        Resmi Mağaza • Hızlı Teslimat
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 group-hover:translate-x-1 transition-transform">
                    <span className="text-xs font-semibold hidden sm:inline">İncele</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </a>

                {/* HEPSIBURADA BUTTON */}
                <a
                  href={product.hbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#FF6000] to-[#E65500] hover:from-[#E65500] hover:to-[#CC4B00] text-white shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <HepsiburadaIcon className="w-4 h-4 fill-white" color="#ffffff" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[13.5px] font-bold tracking-wide">
                        Hepsiburada ile Satın Al
                      </span>
                      <span className="text-[11px] text-white/80 font-normal">
                        Resmi Mağaza • Kolay İade
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 group-hover:translate-x-1 transition-transform">
                    <span className="text-xs font-semibold hidden sm:inline">İncele</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </a>
              </div>

              {/* TRUST BULLETS WITH SVG ICONS */}
              <div className="grid grid-cols-3 gap-2 pt-3.5 mt-3.5 border-t border-stone-100 text-[11px] text-stone-500 text-center font-medium">
                <div className="flex flex-col items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-[#B95B32]" />
                  <span>Hızlı Kargo</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B95B32]" />
                  <span>%100 Orijinal</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#B95B32]" />
                  <span>Hediye Paketi</span>
                </div>
              </div>
            </div>

            {/* QUICK PRODUCT SUMMARY CARDS */}
            <div className="grid grid-cols-2 gap-2.5 text-[12px] text-stone-600">
              <div className="p-3 rounded-xl bg-white/70 border border-[#EBE4DC] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#B95B32] shrink-0" />
                <span>Saf Doğal Keten & Pamuk</span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-[#EBE4DC] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B95B32] shrink-0" />
                <span>Doğal Çekirdek Dolgulu</span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-[#EBE4DC] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#B95B32] shrink-0" />
                <span>Organik Lavanta Terapisi</span>
              </div>
              <div className="p-3 rounded-xl bg-white/70 border border-[#EBE4DC] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B95B32] shrink-0" />
                <span>Yıkanabilir Dış Kılıf</span>
              </div>
            </div>

          </div>
        </div>

        {/* EDITORIAL RITUAL & NATURAL CRAFT SECTION (Breathing Room & Spacious Aesthetic) */}
        <section className="my-20 lg:my-28 py-14 lg:py-20 px-6 md:px-12 rounded-3xl bg-[#F5EFE8]/75 border border-[#E9E0D5] relative overflow-hidden shadow-[0_4px_24px_rgba(74,63,53,0.03)]">
          {/* QUOTE MOMENT */}
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <img
              src="/images/logo-mark.png"
              alt="The Luma Logo"
              className="h-12 w-auto object-contain mx-auto mb-4 opacity-90"
            />
            <span className="inline-flex items-center gap-2 text-[#B95B32] text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE LUMA RİTÜELİ</span>
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <blockquote className="font-serif italic text-[24px] sm:text-[30px] lg:text-[36px] text-[#2C241E] leading-[1.3]">
              &ldquo;{product.message || "Gözlerini kapat, dünyanın sesini susturalım."}&rdquo;
            </blockquote>
          </div>

          {/* 3 NATURAL CRAFT PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 md:p-7 rounded-2xl bg-white/95 border border-[#EBE4DC] shadow-[0_2px_10px_rgba(74,63,53,0.03)] flex flex-col gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#FAF5EF] text-[#B95B32] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-[18px] text-[#2C241E] font-semibold">
                %100 Doğal Keten ve Pamuk
              </h3>
              <p className="text-[13px] text-stone-600 font-light leading-relaxed">
                Cildinize nazikçe dokunan, nefes alabilir, sentetik boya ve kimyasal işlemlerden arındırılmış saf kumaşlar.
              </p>
            </div>

            <div className="p-6 md:p-7 rounded-2xl bg-white/95 border border-[#EBE4DC] shadow-[0_2px_10px_rgba(74,63,53,0.03)] flex flex-col gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#FAF5EF] text-[#B95B32] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-[18px] text-[#2C241E] font-semibold">
                Doğal Kiraz Çekirdeği Dolgusu
              </h3>
              <p className="text-[13px] text-stone-600 font-light leading-relaxed">
                Isıyı ve soğuğu uzun süre tutarak derinlemesine rahatlama ve dengeli mikro masaj etkisi sağlayan çekirdekler.
              </p>
            </div>

            <div className="p-6 md:p-7 rounded-2xl bg-white/95 border border-[#EBE4DC] shadow-[0_2px_10px_rgba(74,63,53,0.03)] flex flex-col gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#FAF5EF] text-[#B95B32] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-[18px] text-[#2C241E] font-semibold">
                Aromaterapik Lavanta Çiçeği
              </h3>
              <p className="text-[13px] text-stone-600 font-light leading-relaxed">
                Doğal kurutulmuş lavanta taneleri ile zihni sakinleştiren, stresi yatıştıran ve uykuya geçişi kolaylaştıran doğal koku.
              </p>
            </div>
          </div>
        </section>

        {/* DETAILED INFORMATION & THERAPY GUIDE (Spacious 2-Column Section) */}
        <section className="my-16 lg:my-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* THERAPY GUIDE CARDS (Left 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B95B32] font-semibold">
                  UYGULAMA VE REHBER
                </span>
                <h2 className="font-serif text-[26px] md:text-[30px] text-[#2C241E] mt-1">
                  Ritüel Nasıl Uygulanır?
                </h2>
              </div>

              {/* HOT THERAPY CARD */}
              <div className="p-5 md:p-6 rounded-2xl bg-[#FAF5EF] border border-[#EAE0D5] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[#B95B32] font-serif font-semibold text-[17px]">
                  <Flame className="w-5 h-5 text-[#B95B32]" />
                  <span>Sıcak Terapi (Mikrodalga & Fırın)</span>
                </div>
                <p className="text-[13.5px] text-stone-600 font-light leading-relaxed">
                  {product.usage.hot}
                </p>
                <div className="mt-2 pt-2.5 border-t border-[#EAE0D5]/80 text-[12px] text-stone-500">
                  <span className="font-medium text-[#4A3F35]">Fırında Isıtma:</span> Fırını 100°C’ye ayarlayın. Ürünü fırın kabı veya pişirme kağıdı üzerinde 10-15 dk bekletin. 200°C üzerine çıkmayın.
                </div>
              </div>

              {/* COLD THERAPY CARD */}
              <div className="p-5 md:p-6 rounded-2xl bg-[#F2F6F8] border border-[#DCE6EB] flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 text-[#3E5C76] font-serif font-semibold text-[17px]">
                  <Snowflake className="w-5 h-5 text-[#3E5C76]" />
                  <span>Soğuk Terapi (Buzdolabı / Dondurucu)</span>
                </div>
                <p className="text-[13.5px] text-stone-600 font-light leading-relaxed">
                  {product.usage.cold}
                </p>
              </div>

              {/* SAFETY NOTICE CARD */}
              <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] text-[12px] text-stone-500 leading-relaxed">
                <p className="font-medium text-[#4A3F35] mb-0.5">Hatırlatma & Güvenlik:</p>
                <p>Ürünlerimiz tıbbi tedavi aracı değildir; doğal rahatlama ve aromaterapik destek sunar. Cilde uygulamadan önce sıcaklığı mutlaka bileğinizin içiyle kontrol ediniz.</p>
              </div>
            </div>

            {/* ACCORDION DETAILS (Right 6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B95B32] font-semibold">
                  DETAYLAR VE BİLGİLER
                </span>
                <h2 className="font-serif text-[26px] md:text-[30px] text-[#2C241E] mt-1">
                  Ürün Hakkında Merak Edilenler
                </h2>
              </div>

              {/* 1. LUMA DOKUNUŞU (HİKAYE) */}
              <details className="group bg-white rounded-xl border border-[#E7DFD5] p-4.5 [&_summary::-webkit-details-marker]:hidden" open>
                <summary className="flex items-center justify-between cursor-pointer list-none font-serif text-[17px] text-[#4A3F35] font-semibold">
                  <span>LUMA Dokunuşu</span>
                  <span className="transition group-open:rotate-180 text-[#B95B32]">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </summary>
                <div className="pt-3 text-[14px] text-stone-600 font-light leading-[1.75] border-t border-stone-100 mt-3">
                  {product.longDesc}
                </div>
              </details>

              {/* 2. İÇERİK VE ÖZELLİKLER */}
              <details className="group bg-white rounded-xl border border-[#E7DFD5] p-4.5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none font-serif text-[17px] text-[#4A3F35] font-semibold">
                  <span>İçeriği ve Özellikleri</span>
                  <span className="transition group-open:rotate-180 text-[#B95B32]">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </summary>
                <ul className="pt-3 space-y-2.5 text-[13.5px] text-stone-600 font-light leading-[1.65] border-t border-stone-100 mt-3">
                  {product.contents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B95B32] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>

              {/* 3. KULLANIM ALANLARI */}
              {product.usageAreas && (
                <details className="group bg-white rounded-xl border border-[#E7DFD5] p-4.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-serif text-[17px] text-[#4A3F35] font-semibold">
                    <span>Kullanım Alanları</span>
                    <span className="transition group-open:rotate-180 text-[#B95B32]">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </summary>
                  <ul className="pt-3 space-y-2.5 text-[13.5px] text-stone-600 font-light leading-[1.65] border-t border-stone-100 mt-3">
                    {product.usageAreas.map((area, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A3F35] mt-2 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {/* 4. BAKIM VE SAKLAMA */}
              {product.care && (
                <details className="group bg-white rounded-xl border border-[#E7DFD5] p-4.5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-serif text-[17px] text-[#4A3F35] font-semibold">
                    <span>Bakım ve Saklama</span>
                    <span className="transition group-open:rotate-180 text-[#B95B32]">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </summary>
                  <p className="pt-3 text-[13.5px] text-stone-600 font-light leading-[1.65] border-t border-stone-100 mt-3">
                    {product.care}
                  </p>
                </details>
              )}

            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="mt-20 pt-14 border-t border-[#EBE4DC]">
          <div className="text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B95B32] font-semibold">
              MERAK EDİLENLER
            </span>
            <h2 className="font-serif text-[30px] md:text-[36px] text-[#2C241E] mt-1.5">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="flex flex-col gap-3 max-w-[840px] mx-auto">
            {[
              {
                q: "Ürün nasıl ısıtılır ve soğutulur?",
                a: "Sıcak terapi için mikrodalga fırında düşük ayarda (500-600W) 30-60 saniye ısıtabilirsiniz. Soğuk terapi için buzdolabı poşetine koyarak dondurucuda 1 saat bekletmeniz yeterlidir.",
              },
              {
                q: "İç dolgusu ve kumaşı tamamen doğal mı?",
                a: "%100 saf doğal keten ve pamuk kumaş, organik kurutulmuş lavanta taneleri ve temizlenmiş doğal kiraz çekirdekleri kullanılmaktadır. Hiçbir kimyasal katkı içermez.",
              },
              {
                q: "Kumaş kılıfı yıkanabilir mi?",
                a: "Evet, çift katmanlı tasarımı sayesinde fermuarlı dış kılıfı çıkarıp elde veya 30°C hassas programda yıkayabilirsiniz. Çekirdek dolgulu iç kısım yıkanmaz, havalandırılır.",
              },
              {
                q: "Sipariş ve kargo süreci nasıl işler?",
                a: "Trendyol ve Hepsiburada mağazalarımız üzerinden verilen tüm siparişler 1-2 iş günü içerisinde özenle paketlenerek kargoya verilir.",
              },
            ].map((faq, faqIdx) => (
              <details
                key={faqIdx}
                className="group bg-white rounded-xl border border-[#E7DFD5] p-4.5 [&_summary::-webkit-details-marker]:hidden transition-all duration-200"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-[15.5px] text-[#4A3F35] hover:text-[#B95B32] transition-colors">
                  <span className="pr-6">{faq.q}</span>
                  <span className="transition group-open:rotate-180 shrink-0 text-[#B95B32]">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </summary>
                <p className="text-stone-600 text-[13.5px] font-light leading-[1.7] pt-3.5 mt-2.5 border-t border-stone-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-9">
            <Link
              href="/sss"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-[#B95B32] font-semibold hover:text-[#4A3F35] transition-colors"
            >
              <span>Tüm Soruları ve Cevapları Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {otherProducts.length > 0 && (
          <div className="mt-16 pt-14 border-t border-[#EBE4DC]">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B95B32] font-semibold">
                  DİĞER RİTÜELLERİMİZ
                </span>
                <h3 className="font-serif text-[26px] md:text-[32px] text-[#2C241E] mt-1">
                  Koleksiyonu Keşfetmeye Devam Edin
                </h3>
              </div>
              <Link
                href="/urunler"
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] text-[#B95B32] font-semibold hover:text-[#4A3F35] transition-colors"
              >
                <span>Tümünü Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/urunler/${p.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E7DFD5] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className={`absolute top-4 left-4 ${p.badgeBg || "bg-[#4A3F35]"} text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#B95B32] font-semibold mb-1">
                      {p.subtitle}
                    </span>
                    <h4 className="font-serif text-[20px] text-[#2C241E] mb-1.5 group-hover:text-[#B95B32] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-[12.5px] text-stone-500 font-light line-clamp-2 mb-3">
                      {p.shortDesc}
                    </p>
                    <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#4A3F35] group-hover:text-[#B95B32] flex items-center gap-1 transition-colors">
                        <span>İncele</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
