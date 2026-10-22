"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductItem } from "@/data/products";
import {
  TRENDYOL_STORE_URL,
  HEPSIBURADA_STORE_URL,
  TrendyolIcon,
  HepsiburadaIcon,
} from "@/components/ui/MarketplaceBrand";

interface ProductListClientProps {
  products: ProductItem[];
  categories: readonly string[] | string[];
}

export default function ProductListClient({
  products,
  categories,
}: ProductListClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Tümü") return products;
    return products.filter(
      (product) =>
        product.categories?.includes(activeCategory) ||
        product.category === activeCategory
    );
  }, [products, activeCategory]);

  // Compute product count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Tümü: products.length,
    };
    categories.forEach((cat) => {
      if (cat !== "Tümü") {
        counts[cat] = products.filter(
          (p) => p.categories?.includes(cat) || p.category === cat
        ).length;
      }
    });
    return counts;
  }, [products, categories]);

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-primary/20">
      {/* PAGE HEADER - EDITORIAL */}
      <section className="w-full bg-[#FDFAF7] pt-20 pb-24 md:pt-28 md:pb-32 px-6 border-b border-border/30">
        <div className="mx-auto w-full max-w-[800px] text-center flex flex-col items-center">
          <img
            src="/images/logo-mark.png"
            alt="The Luma Logo"
            className="h-14 w-auto object-contain mb-5"
          />
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B95B32] font-semibold mb-6">
            LUMA KOLEKSİYONU
          </p>
          <h1 className="font-serif text-[42px] md:text-[56px] font-medium text-foreground leading-[1.1] mb-8">
            Doğadan Gelen <br className="hidden sm:block" /> Şefkat
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.85] font-light">
            Sürdürülebilir organik kumaşlar, Anadolu&apos;nun saf kiraz çekirdekleri ve aromaterapik lavantalarla hazırlanan ürünlerimiz; bedeninize ve ruhunuza hak ettiği dinginliği sunar.
          </p>

          {/* MARKETPLACE LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-border/40">
            <span className="text-[12px] text-muted-foreground font-medium">Online Mağazalarımız:</span>
            <a
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F27A1A]/10 hover:bg-[#F27A1A] text-[#F27A1A] hover:text-white border border-[#F27A1A]/30 text-[12px] font-semibold shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <TrendyolIcon className="w-3.5 h-3.5 fill-current" color="currentColor" />
              <span>Trendyol Mağazamız</span>
            </a>
            <a
              href={HEPSIBURADA_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6000]/10 hover:bg-[#FF6000] text-[#FF6000] hover:text-white border border-[#FF6000]/30 text-[12px] font-semibold shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <HepsiburadaIcon className="w-3.5 h-3.5 fill-current" color="currentColor" />
              <span>Hepsiburada Mağazamız</span>
            </a>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="w-full border-b border-border/30 sticky top-[72px] md:top-[80px] bg-background/90 backdrop-blur-xl z-40 transition-colors">
        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] tracking-wide font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-md scale-[1.02]"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-background/80 text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-16 md:py-24">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-border/40 rounded-[24px] bg-[#FDFAF7] text-center max-w-[650px] mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#B95B32]/10 flex items-center justify-center text-[#B95B32] mb-5">
              <span className="material-symbols-outlined text-[28px]">filter_list_off</span>
            </div>
            <h3 className="font-serif text-[24px] font-medium text-foreground mb-2">
              Bu kategoride ürün bulunamadı
            </h3>
            <p className="text-[15px] text-muted-foreground leading-[1.7] font-light max-w-[450px] mb-6">
              Seçtiğiniz kategori için henüz ürün listelenmemiş olabilir. Diğer kategorilerimizi keşfedebilirsiniz.
            </p>
            <button
              onClick={() => setActiveCategory("Tümü")}
              className="px-6 py-3 bg-foreground text-background rounded-full text-[13px] font-semibold hover:opacity-90 transition-all cursor-pointer"
            >
              Tüm Ürünleri Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.slug} className="group flex flex-col">
                <Link
                  href={`/urunler/${product.slug}`}
                  className="relative w-full aspect-[4/5] bg-muted/20 rounded-[12px] overflow-hidden mb-6 block"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />

                  {product.badge && (
                    <div
                      className={`absolute top-5 left-5 ${product.badgeBg || "bg-[#4A3F35]"} text-white text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase shadow-xs`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="bg-white/95 backdrop-blur-sm text-foreground text-[13px] font-semibold tracking-wide px-8 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      Ürünü İncele
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col px-2">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex flex-col">
                      <Link
                        href={`/urunler/${product.slug}`}
                        className="font-serif text-[22px] font-medium text-foreground leading-tight group-hover:text-[#B95B32] transition-colors"
                      >
                        {product.title}
                      </Link>
                      <span className="text-[12px] text-muted-foreground mt-1">
                        {product.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-[14px] text-muted-foreground leading-[1.6] font-light mt-2 line-clamp-2">
                    {product.shortDesc}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40">
                    <Link
                      href={`/urunler/${product.slug}`}
                      className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1 group/link"
                    >
                      Detayları Gör
                      <span className="material-symbols-outlined text-[15px] group-hover/link:translate-x-0.5 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                    <div className="ml-auto flex items-center gap-1.5">
                      {product.trendyolUrl && (
                        <a
                          href={product.trendyolUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Trendyol'da İncele"
                          className="w-7 h-7 rounded-full bg-[#F27A1A]/10 hover:bg-[#F27A1A] text-[#F27A1A] hover:text-white flex items-center justify-center transition-colors"
                          title="Trendyol Mağazası"
                        >
                          <TrendyolIcon className="w-3 h-3 fill-current" color="currentColor" />
                        </a>
                      )}
                      {product.hbUrl && (
                        <a
                          href={product.hbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Hepsiburada'da İncele"
                          className="w-7 h-7 rounded-full bg-[#FF6000]/10 hover:bg-[#FF6000] text-[#FF6000] hover:text-white flex items-center justify-center transition-colors"
                          title="Hepsiburada Mağazası"
                        >
                          <HepsiburadaIcon className="w-3 h-3 fill-current" color="currentColor" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
