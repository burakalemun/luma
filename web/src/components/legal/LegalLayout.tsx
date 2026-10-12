import Link from "next/link";
import React from "react";

interface LegalLayoutProps {
  currentSlug: "gizlilik" | "sartlar" | "kvkk";
  title: string;
  subtitle: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const TABS = [
  { slug: "gizlilik", label: "Gizlilik Politikası", href: "/gizlilik" },
  { slug: "sartlar", label: "Kullanım Şartları", href: "/sartlar" },
  { slug: "kvkk", label: "KVKK Aydınlatma Metni", href: "/kvkk" },
];

export default function LegalLayout({
  currentSlug,
  title,
  subtitle,
  lastUpdated = "12 Ekim 2026",
  children,
}: LegalLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      
      {/* ─── HEADER SECTION ────────────────────────────────────────── */}
      <section className="relative w-full bg-[#FDFAF7] pt-24 pb-16 md:pt-32 md:pb-20 px-6 border-b border-border/40 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-full max-w-[960px] text-center flex flex-col items-center relative z-10">
          <Link href="/" className="mb-5 inline-block group">
            <img
              src="/images/logo-mark.png"
              alt="The Luma"
              className="h-14 w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-primary/60" />
            <p className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
              YASAL BİLGİLENDİRME
            </p>
            <span className="w-6 h-[1px] bg-primary/60" />
          </div>

          <h1 className="font-serif text-[38px] md:text-[52px] font-medium text-foreground leading-[1.12] mb-5 tracking-[-0.02em]">
            {title}
          </h1>

          <p className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.7] font-light max-w-[620px] mb-8">
            {subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/60 text-[12px] text-muted-foreground font-medium mb-10">
            <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
            <span>Son Güncelleme: {lastUpdated}</span>
          </div>

          {/* TAB SWITCHER */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-card border border-border/80 shadow-xs max-w-full">
            {TABS.map((tab) => {
              const isActive = currentSlug === tab.slug;
              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ───────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[920px] px-6 py-16 md:py-24">
        <article className="legal-article max-w-none text-[#4A3F35] font-light leading-[1.8] space-y-6 [&_h2]:font-serif [&_h2]:font-semibold [&_h2]:text-[24px] [&_h2]:md:text-[28px] [&_h2]:text-foreground [&_h2]:pt-8 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-border/50 [&_h2]:mt-10 [&_h3]:font-serif [&_h3]:font-semibold [&_h3]:text-[19px] [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-[15.5px] [&_p]:md:text-[16.5px] [&_p]:leading-[1.85] [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2.5 [&_li]:text-[15px] [&_li]:md:text-[16px] [&_li]:leading-[1.75] [&_strong]:text-foreground [&_strong]:font-semibold">
          {children}
        </article>

        {/* Contact Assistance Box */}
        <div className="mt-20 p-8 md:p-10 rounded-[28px] bg-[#FAF7F4] border border-[#E8DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-[22px] font-semibold text-foreground">
              Sorularınız mı var?
            </h3>
            <p className="text-[14.5px] text-muted-foreground leading-[1.6] font-light max-w-[480px]">
              Yasal politikalarımız veya kişisel verilerinizle ilgili her türlü soru ve başvuru için bize doğrudan ulaşabilirsiniz.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#B95B32] hover:bg-[#A34F2A] text-white rounded-[14px] h-[48px] px-7 text-[13.5px] font-semibold transition-all shadow-md shadow-[#B95B32]/20 hover:shadow-lg shrink-0"
          >
            <span>Bize Ulaşın</span>
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
