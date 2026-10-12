"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetDescription,
  SheetClose 
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, ArrowUpRight, Mail } from "lucide-react";
import {
  TRENDYOL_STORE_URL,
  HEPSIBURADA_STORE_URL,
  TrendyolLogo,
  HepsiburadaLogo,
  TrendyolIcon,
  HepsiburadaIcon,
} from "@/components/ui/MarketplaceBrand";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Anasayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Workshop", href: "/workshop" },
  { label: "Blog", href: "/blog" },
  { label: "Hikayemiz", href: "/hakkimizda" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer automatically on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b border-border/60 transition-all duration-300">
      <div className="mx-auto flex h-[76px] lg:h-[80px] max-w-[1320px] items-center justify-between px-5 sm:px-6 lg:px-12">
        
        {/* Left: Brand */}
        <Link href="/" className="flex items-center group focus:outline-none" aria-label="The Luma Ana Sayfa">
          <img
            src="/images/logo-mark.png"
            alt="The Luma"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-9">
          {NAV_LINKS.filter(item => item.href !== "/sss").map((item) => {
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
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={TRENDYOL_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Luma Trendyol Mağazası"
            className="inline-flex items-center gap-2 rounded-full bg-[#F27A1A]/10 hover:bg-[#F27A1A] text-[#F27A1A] hover:text-white border border-[#F27A1A]/30 font-medium text-[12px] px-4 h-9 shadow-xs hover:shadow-md transition-all duration-300 group"
          >
            <TrendyolLogo className="h-3.5 w-auto fill-current transition-colors" color="currentColor" />
            <span className="text-[10px] tracking-wider uppercase font-bold opacity-80 group-hover:opacity-100">Mağaza</span>
          </a>
          <a
            href={HEPSIBURADA_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The Luma Hepsiburada Mağazası"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6000]/10 hover:bg-[#FF6000] text-[#FF6000] hover:text-white border border-[#FF6000]/30 font-medium text-[12px] px-4 h-9 shadow-xs hover:shadow-md transition-all duration-300 group"
          >
            <HepsiburadaLogo className="h-3.5 w-auto fill-current transition-colors" color="currentColor" />
            <span className="text-[10px] tracking-wider uppercase font-bold opacity-80 group-hover:opacity-100">Mağaza</span>
          </a>
        </div>

        {/* Mobile Menu Toggle (Tablet/Phone) */}
        <div className="lg:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger 
              className="inline-flex items-center justify-center text-foreground hover:bg-muted/60 rounded-full h-10 w-10 border border-border/70 transition-all active:scale-95 cursor-pointer"
              aria-label="Menüyü aç"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </SheetTrigger>

            <SheetContent 
              side="right" 
              showCloseButton={false}
              className="w-[85vw] max-w-[360px] bg-background border-l border-border/70 p-0 flex flex-col h-full shadow-2xl"
            >
              {/* Accessible Dialog Titles */}
              <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
              <SheetDescription className="sr-only">The Luma mobil gezinti bağlantıları ve mağazaları</SheetDescription>

              {/* Drawer Top Bar: Brand & Close */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/60 bg-card/40">
                <Link 
                  href="/" 
                  className="flex items-center group" 
                  onClick={() => setIsOpen(false)}
                  aria-label="The Luma Ana Sayfa"
                >
                  <img
                    src="/images/logo-mark.png"
                    alt="The Luma"
                    className="h-9 w-auto object-contain"
                  />
                </Link>

                <SheetClose 
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all cursor-pointer active:scale-95"
                  aria-label="Menüyü kapat"
                >
                  <X className="w-4 h-4" />
                </SheetClose>
              </div>

              {/* Drawer Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-between gap-8">
                
                {/* Main Navigation Links */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 px-3 mb-2">
                    Menü
                  </div>
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                            isActive 
                              ? "bg-primary/10 text-primary font-semibold shadow-xs" 
                              : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            {isActive ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-muted-foreground/30 transition-colors" />
                            )}
                            {item.label}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 ${
                            isActive ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                          }`} />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Marketplace Stores */}
                <div className="flex flex-col gap-2.5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70 px-1 mb-1">
                    Online Satış Mağazaları
                  </div>
                  
                  <a
                    href={TRENDYOL_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-[#F27A1A]/20 bg-[#F27A1A]/[0.03] hover:bg-[#F27A1A]/[0.08] hover:border-[#F27A1A]/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F27A1A] text-white flex items-center justify-center shadow-sm">
                        <TrendyolIcon className="w-5 h-5 fill-white" color="#ffffff" />
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <TrendyolLogo className="h-3.5 w-auto fill-[#F27A1A]" color="#F27A1A" />
                          <span className="text-[12px] font-semibold text-foreground">Mağazası</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-0.5">
                          Orijinal ürünler & hızlı kargo
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#F27A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <a
                    href={HEPSIBURADA_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-[#FF6000]/20 bg-[#FF6000]/[0.03] hover:bg-[#FF6000]/[0.08] hover:border-[#FF6000]/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF6000] text-white flex items-center justify-center shadow-sm">
                        <HepsiburadaIcon className="w-5 h-5 fill-white" color="#ffffff" />
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <HepsiburadaLogo className="h-3.5 w-auto fill-[#FF6000]" color="#FF6000" />
                          <span className="text-[12px] font-semibold text-foreground">Mağazası</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-0.5">
                          Resmi satıcı güvencesi
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#FF6000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>

              </div>

              {/* Drawer Bottom Info & Contact */}
              <div className="p-5 border-t border-border/60 bg-muted/20 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                  <a
                    href="https://instagram.com/thelumaa_"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>@thelumaa_</span>
                  </a>
                  <a
                    href="mailto:hello@theluma.com"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>hello@theluma.com</span>
                  </a>
                </div>
                <div className="text-[11px] text-center text-muted-foreground/60">
                  🌿 Doğal Kiraz Çekirdeği & Organik Keten
                </div>
              </div>

            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </header>
  );
}
