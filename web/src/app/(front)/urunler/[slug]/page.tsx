import Link from "next/link";
import { notFound } from "next/navigation";
import { productsDb } from "@/data/products";
import { blogPosts } from "@/data/blog";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = productsDb.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-32 selection:bg-[#B95B32]/20">
      
      {/* BREADCRUMB */}
      <div className="w-full pt-32 pb-12 px-6 md:px-12 border-b border-border/20">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
            <span className="text-border font-light">/</span>
            <Link href="/urunler" className="hover:text-primary transition-colors">Koleksiyon</Link>
            <span className="text-border font-light">/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* LEFT: IMAGE STACK (Editorial Style) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {product.images.map((img, idx) => (
            <div key={idx} className="w-full relative">
              <img 
                src={img} 
                alt={`${product.title} - Görsel ${idx + 1}`} 
                className="w-full h-auto object-cover rounded-[4px]"
              />
              {idx === 0 && product.badge && (
                <div className={`absolute top-6 left-6 ${product.badgeBg} text-white text-[10px] font-semibold tracking-widest px-4 py-2 uppercase shadow-sm`}>
                  {product.badge}
                </div>
              )}
            </div>
          ))}
          {/* Vurgulu Mesaj */}
          <div className="w-full py-16 flex flex-col justify-center items-center text-center px-8 border-t border-b border-border/30 mt-8">
            <span className="font-serif italic text-[24px] md:text-[32px] text-[#4A3F35] leading-relaxed">
              &quot;{product.message}&quot;
            </span>
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO (Sticky) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col pt-4">
          
          {/* HEADER & BUY BUTTONS */}
          <h1 className="font-serif text-[42px] md:text-[54px] text-foreground leading-[1.05] tracking-tight mb-4">
            {product.title}
          </h1>
          <p className="text-[15px] uppercase tracking-widest text-muted-foreground font-medium mb-10">
            {product.subtitle}
          </p>
          <p className="text-[17px] text-[#4A3F35] leading-[1.8] font-light mb-12">
            {product.shortDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a 
              href={product.trendyolUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#F27A1A] hover:bg-[#D96811] text-white h-[56px] px-8 text-[13px] tracking-widest font-semibold uppercase transition-colors duration-300 rounded-[4px]"
            >
              Trendyol'dan Al
            </a>
            <a 
              href={product.hbUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#FF6000] hover:bg-[#E55600] text-white h-[56px] px-8 text-[13px] tracking-widest font-semibold uppercase transition-colors duration-300 rounded-[4px]"
            >
              Hepsiburada'dan Al
            </a>
          </div>

          {/* EDITORIAL DETAILS LIST */}
          <div className="space-y-12">
            
            {/* ŞERİT BASKI (Tüm Isıtılabilir Ürünler için Global Özellikler) */}
            {product.isHeated && (
              <div className="bg-[#FDFAF7] border border-[#B95B32]/20 rounded-[8px] p-6 space-y-3">
                <p className="text-[14px] text-[#4A3F35] font-medium leading-[1.6]">
                  <span className="text-[#B95B32] mr-2">✦</span> Ürünlerimiz tamamen organik ve el yapımıdır.
                </p>
                <p className="text-[14px] text-[#4A3F35] font-medium leading-[1.6]">
                  <span className="text-[#B95B32] mr-2">✦</span> Çift katlı tasarımı sayesinde dış kılıf çıkarılıp kolayca yıkanabilir.
                </p>
              </div>
            )}

            {/* HİKAYESİ */}
            <div className="border-t border-border/40 pt-8">
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">LUMA DOKUNUŞU</h3>
              <p className="text-[16px] text-muted-foreground leading-[1.85] font-light">
                {product.longDesc}
              </p>
            </div>

            {/* İÇERİK */}
            <div className="border-t border-border/40 pt-8">
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">İÇERİĞİ VE ÖZELLİKLERİ</h3>
              <ul className="space-y-4">
                {product.contents.map((item, i) => (
                  <li key={i} className="flex items-start text-[16px] text-muted-foreground leading-[1.7] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B95B32]/60 mr-4 mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* KULLANIM ALANLARI */}
            {product.usageAreas && (
              <div className="border-t border-border/40 pt-8">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">KULLANIM ALANLARI</h3>
                <ul className="space-y-4">
                  {product.usageAreas.map((area, i) => (
                    <li key={i} className="flex items-start text-[16px] text-muted-foreground leading-[1.7] font-light">
                      <span className="w-1 h-1 bg-[#4A3F35]/40 mr-4 mt-2.5 shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* KULLANIM ŞEKLİ (MİKRODALGA VE SOĞUK) */}
            <div className="border-t border-border/40 pt-8">
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">RİTÜEL NASIL UYGULANIR?</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-serif italic text-[22px] text-[#B95B32] mb-3">Isıtma İçin (Mikrodalga)</h4>
                  <p className="text-[15px] text-muted-foreground font-light leading-[1.7]">
                    {product.usage.hot}
                  </p>
                </div>
                <div>
                  <h4 className="font-serif italic text-[22px] text-[#4A3F35] mb-3">Soğutma İçin</h4>
                  <p className="text-[15px] text-muted-foreground font-light leading-[1.7]">
                    {product.usage.cold}
                  </p>
                </div>
              </div>
            </div>

            {/* BAKIM VE SAKLAMA */}
            {product.care && (
              <div className="border-t border-border/40 pt-8">
                <h3 className="text-[11px] uppercase tracking-[0.25em] text-foreground font-semibold mb-6">BAKIM VE SAKLAMA</h3>
                <p className="text-[15px] text-muted-foreground font-light leading-[1.7]">
                  {product.care}
                </p>
              </div>
            )}

            {/* FIRINDA ISITMA VE GENEL UYARILAR */}
            {product.isHeated && (
              <div className="bg-[#fcf8f5] border border-red-900/10 rounded-[12px] p-6 md:p-8 space-y-8 mt-12">
                <div>
                  <h4 className="font-serif italic text-[20px] text-red-900/80 mb-4">Fırında Isıtma Talimatı (Alternatif)</h4>
                  <ul className="space-y-3 text-[14px] text-muted-foreground font-light leading-[1.6] pl-2">
                    <li className="flex items-start"><span className="mr-2">•</span> Fırını 100°C’ye (düşük ısıya) ayarlayın.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Ürünü, fırın tepsisine ısıya dayanıklı cam/kase içinde veya temiz bir fırın kâğıdı üzerinde yerleştirin. Ortalama 10-15 dakika bekletin.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Çıkardıktan sonra dokunarak sıcaklığını kontrol edin, fazla sıcaksa 1-2 dakika bekleyin.</li>
                    <li className="flex items-start"><span className="mr-2 text-red-900/60 font-medium">Uyarı:</span> Fırında 200°C’nin üstüne çıkmayın (yanma riski). Ürünü asla direkt ızgara teline koymayın.</li>
                  </ul>
                </div>

                <div className="border-t border-red-900/10 pt-6">
                  <h4 className="font-serif italic text-[20px] text-red-900/80 mb-4">Genel Uyarılar</h4>
                  <ul className="space-y-3 text-[14px] text-muted-foreground font-light leading-[1.6] pl-2">
                    <li className="flex items-start"><span className="mr-2">•</span> Mikrodalgada maksimum süreyi aşmayın, aşırı ısınma yangın riski yaratabilir.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Cilde temas etmeden önce ısısını mutlaka elinizle kontrol edin, gerekirse kısa süre havalandırın.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Ürünler tıbbi cihaz değildir, sadece destekleyici ve rahatlatıcı amaçlıdır.</li>
                    <li className="flex items-start"><span className="mr-2">•</span> Hamilelik veya sağlık sorunları varsa doktorunuza danışarak kullanın. Çocukların gözetimsiz kullanımına uygun değildir.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* PRODUCT SPECIFIC FAQ SECTION */}
      <section className="mx-auto w-full max-w-[1000px] px-6 lg:px-12 pb-24">
        <div className="border-t border-border/40 pt-16">
          <h2 className="font-serif text-[32px] text-foreground mb-8 text-center">Merak Edilenler</h2>
          <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
            {/* SSS Veritabanından rastgele veya ürüne özel 4 soru çekelim */}
            {blogPosts.flatMap(post => post.faqs).slice(0, 4).map((faq, faqIdx) => (
              <details 
                key={faqIdx} 
                className="group bg-transparent border-b border-border/40 pb-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-[16px] font-medium text-foreground hover:text-[#B95B32] transition-colors">
                  <span className="pr-8">{faq.q}</span>
                  <span className="transition group-open:rotate-180 flex-shrink-0 text-[#B95B32]">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-muted-foreground text-[15px] font-light leading-[1.7] mt-3 pr-4 animate-in fade-in duration-300 slide-in-from-top-1">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sss" className="text-[13px] tracking-[0.2em] uppercase text-[#B95B32] font-semibold hover:text-foreground transition-colors">
              Tüm Soruları Gör →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
