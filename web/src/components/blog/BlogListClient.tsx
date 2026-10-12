"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogListClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export default function BlogListClient({ initialPosts, categories }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredPosts = activeCategory === "Tümü"
    ? initialPosts
    : initialPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-primary/20">
      
      {/* PAGE HEADER */}
      <section className="w-full bg-[#FDFAF7] pt-32 pb-24 px-6 border-b border-border/30">
        <div className="mx-auto w-full max-w-[800px] text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B95B32] font-semibold mb-6">
            LUMA YAYINLARI
          </p>
          <h1 className="font-serif text-[42px] md:text-[56px] font-medium text-foreground leading-[1.1] mb-8">
            Daha Yavaş Bir <br className="hidden sm:block" /> Yaşam İçin Notlar
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.85] font-light">
            Doğal yaşam, ruh sağlığı, uyku hijyeni ve sürdürülebilirlik üzerine derinlemesine rehberler ve ilham veren ritüeller.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      {categories.length > 1 && (
        <section className="w-full border-b border-border/30 sticky top-[72px] md:top-[80px] bg-background/95 backdrop-blur-xl z-40">
          <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-5">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[13px] tracking-wide font-medium transition-all duration-300 ${
                    activeCategory === cat
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
      )}

      {/* BLOG GRID */}
      <section className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-16 md:py-24">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-border/40 rounded-[12px] bg-[#FDFAF7] text-center max-w-[650px] mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#B95B32]/10 flex items-center justify-center text-[#B95B32] mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </div>
            <h3 className="font-serif text-[24px] font-medium text-foreground mb-2">
              Henüz Yayınlanmış Bir Blog Yazısı Bulunmuyor
            </h3>
            <p className="text-[15px] text-muted-foreground leading-[1.7] font-light max-w-[450px]">
              Doğal yaşam, uyku hijyeni ve ritüel rehberlerimiz çok yakında burada paylaşılacaktır.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredPosts.map((post, idx) => (
              <Link href={`/blog/${post.slug}`} key={idx} className="group flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-muted/20 rounded-[8px] overflow-hidden mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase rounded-sm shadow-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="font-serif text-[24px] font-medium text-foreground leading-[1.3] group-hover:text-[#B95B32] transition-colors line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.7] font-light mt-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-6 flex items-center text-[12px] uppercase tracking-widest text-[#B95B32] font-semibold group-hover:underline underline-offset-4">
                    Okumaya Devam Et 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
