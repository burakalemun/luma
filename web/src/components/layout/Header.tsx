"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Blog", href: "/blog" },
  { label: "Workshop", href: "/workshop" },
  { label: "Hikayemiz", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border/60 transition-all duration-300">
      <div className="mx-auto flex h-[80px] max-w-[1320px] items-center justify-between px-6 lg:px-12">
        
        {/* Left: Brand */}
        <Link href="/" className="font-serif text-[22px] font-semibold text-foreground flex items-center gap-2 group">
          The Luma
          <span className="material-symbols-outlined text-secondary text-[22px] transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">spa</span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-[14px] font-medium tracking-[0.02em] py-2 transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {/* Underline Hover Effect */}
                <span 
                  className={`absolute left-0 bottom-0 h-[1.5px] bg-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.trendyol.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border/80 text-muted-foreground hover:text-[#F27A1A] hover:border-[#F27A1A] font-medium text-[12px] tracking-wide px-5 h-9 transition-all duration-300"
          >
            Trendyol
          </a>
          <a
            href="https://www.hepsiburada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border/80 text-muted-foreground hover:text-[#FF6000] hover:border-[#FF6000] font-medium text-[12px] tracking-wide px-5 h-9 transition-all duration-300"
          >
            Hepsiburada
          </a>
        </div>

        {/* Mobile Menu Toggle (Tablet/Phone) */}
        <div className="lg:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex items-center justify-center text-foreground hover:bg-muted/50 rounded-full h-10 w-10 transition-colors">
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background border-l-border/60">
              <div className="flex flex-col h-full mt-6">
                {/* Brand in Mobile Menu */}
                <Link href="/" className="font-serif text-[26px] font-semibold text-foreground flex items-center gap-2 mb-10" onClick={() => setIsOpen(false)}>
                  The Luma
                  <span className="material-symbols-outlined text-secondary text-[24px]">spa</span>
                </Link>
                
                {/* Mobile Links */}
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-[17px] font-medium tracking-wide transition-colors ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Marketplaces */}
                <div className="mt-auto pb-8 flex flex-col gap-3">
                  <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mb-2">Satın Al</span>
                  <a href="https://www.trendyol.com" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center rounded-full border border-border/80 text-foreground hover:text-[#F27A1A] hover:border-[#F27A1A] h-[48px] px-5 text-[13px] font-medium transition-colors">
                    Trendyol Mağazası
                  </a>
                  <a href="https://www.hepsiburada.com" target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center rounded-full border border-border/80 text-foreground hover:text-[#FF6000] hover:border-[#FF6000] h-[48px] px-5 text-[13px] font-medium transition-colors">
                    Hepsiburada Mağazası
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </header>
  );
}
