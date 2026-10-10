import Link from "next/link";
import { productsDb } from "@/data/products";

export default function ProductsPage() {
  const categories = ["Tümü", "Göz Maskeleri", "Denge Yastıkları", "Ağrı Yastıkları", "Mumlar"];

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-primary/20">
      {/* PAGE HEADER - EDITORIAL */}
      <section className="w-full bg-[#FDFAF7] pt-20 pb-24 md:pt-28 md:pb-32 px-6 border-b border-border/30">
        <div className="mx-auto w-full max-w-[800px] text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B95B32] font-semibold mb-6">
            LUMA KOLEKSİYONU
          </p>
          <h1 className="font-serif text-[42px] md:text-[56px] font-medium text-foreground leading-[1.1] mb-8">
            Doğadan Gelen <br className="hidden sm:block" /> Şefkat
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.85] font-light">
            Sürdürülebilir organik kumaşlar, Anadolu&apos;nun saf kiraz çekirdekleri ve aromaterapik lavantalarla hazırlanan ürünlerimiz; bedeninize ve ruhunuza hak ettiği dinginliği sunar.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="w-full border-b border-border/30 sticky top-[72px] md:top-[80px] bg-background/90 backdrop-blur-xl z-40">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[13px] tracking-wide font-medium transition-all duration-300 ${
                  idx === 0
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {productsDb.map((product, idx) => (
            <Link href={`/urunler/${product.slug}`} key={idx} className="group flex flex-col">
              <div className="relative w-full aspect-[4/5] bg-muted/20 rounded-[4px] overflow-hidden mb-6">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
                
                {product.badge && (
                  <div className={`absolute top-5 left-5 ${product.badgeBg} text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase`}>
                    {product.badge}
                  </div>
                )}
                
                {/* Hover Add to Cart Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="bg-white/95 backdrop-blur-sm text-foreground text-[13px] font-semibold tracking-wide px-8 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                    İncele
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col px-2">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex flex-col">
                    <h3 className="font-serif text-[22px] font-medium text-foreground leading-tight group-hover:text-[#B95B32] transition-colors">
                      {product.title}
                    </h3>
                    <span className="text-[12px] text-muted-foreground mt-1">{product.subtitle}</span>
                  </div>
                </div>
                <p className="text-[14px] text-muted-foreground leading-[1.6] font-light mt-3">
                  {product.shortDesc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
    </div>
  );
}
