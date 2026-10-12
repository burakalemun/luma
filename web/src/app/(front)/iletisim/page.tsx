import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { InstagramIcon } from "@/components/ui/MarketplaceBrand";

export const metadata = {
  title: "İletişim | LUMA",
  description: "LUMA ile iletişime geçin. Kişisel ritüelleriniz, ürün danışmanlığı, kurumsal hediye çözümleri ve atölyeler hakkında bize yazın.",
};

const FAQ_ITEMS = [
  {
    q: "Siparişler ne kadar sürede kargoya teslim ediliyor?",
    a: "Tüm ürünlerimiz taze lavanta ve özenli el işçiliğiyle hazırlandığı için siparişleriniz 1-3 iş günü içerisinde özenle paketlenip kargoya verilir.",
  },
  {
    q: "Ürünleri mikrodalgada nasıl ısıtmalıyım?",
    a: "Göz maskeleri düşük ayarda (500-600W) 20-30 saniye, boyun ve sırt yastıkları ise 1-1.5 dakika ısıtılmalıdır. Her zaman kuru ve temiz mikrodalgada ısıtınız.",
  },
  {
    q: "Özel hediye kutusu veya kurumsal toplu sipariş alıyor musunuz?",
    a: "Evet! Şirket etkinlikleri, nedime kutuları ve özel gün hediyeleri için kişiselleştirilmiş notlar ve özel paketlemeler hazırlıyoruz. Form üzerinden 'Kurumsal Çözüm' konusunu seçerek bize ulaşabilirsiniz.",
  },
  {
    q: "LUMA Studio atölyelerini yerinde ziyaret edebilir miyim?",
    a: "İstanbul'daki atölye alanımız yalnızca planlı workshop takvimi ve özel randevular dahilinde ziyarete açıktır. Ziyaretler için önceden iletişime geçebilirsiniz.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">

      {/* ─── 1. HERO SECTION ────────────────────────────────────────── */}
      <section className="relative w-full bg-[#FDFAF7] pt-24 pb-20 md:pt-32 md:pb-28 px-6 border-b border-border/40 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-full max-w-[1200px] text-center flex flex-col items-center relative z-10">
          <img
            src="/images/logo-mark.png"
            alt="The Luma Logo"
            className="h-16 w-auto object-contain mb-6 drop-shadow-xs"
          />
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-primary/60" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold">
              BİZE ULAŞIN
            </p>
            <span className="w-8 h-[1px] bg-primary/60" />
          </div>

          <h1 className="font-serif text-[44px] md:text-[60px] lg:text-[66px] font-medium text-foreground leading-[1.08] tracking-[-0.02em] mb-6">
            Sizi Dinliyoruz
          </h1>

          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.8] font-light max-w-[640px]">
            LUMA ürünleri, kişisel ritüelleriniz, kurumsal hediye çözümleri veya 
            birlikte üreteceğimiz projeler hakkında bir fincan çay dinginliğinde konuşalım.
          </p>

          {/* Quick Connect Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[920px] mt-12 pt-8 border-t border-border/40 text-left">
            {/* WhatsApp */}
            <a
              href="https://wa.me/905000000000?text=Merhaba%2C%20LUMA%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[22px] bg-card border border-border/60 hover:border-[#25D366]/40 hover:shadow-md transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">chat</span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  WhatsApp Danışma
                </p>
                <p className="text-[14.5px] font-semibold text-foreground group-hover:text-[#25D366] transition-colors truncate">
                  Canlı Mesaj Gönder
                </p>
                <span className="text-[11.5px] text-muted-foreground mt-0.5 block">Hızlı dönüş (09:00 - 19:00)</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/thelumaa_"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-[22px] bg-card border border-border/60 hover:border-[#E1306C]/40 hover:shadow-md transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-5 h-5 text-[#E1306C]" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Instagram
                </p>
                <p className="text-[14.5px] font-semibold text-foreground group-hover:text-[#E1306C] transition-colors truncate">
                  @thelumaa_
                </p>
                <span className="text-[11.5px] text-muted-foreground mt-0.5 block">DM ile 7/24 bağlantı</span>
              </div>
            </a>

            {/* E-Posta */}
            <a
              href="mailto:merhaba@theluma.com"
              className="p-5 rounded-[22px] bg-card border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 group flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">mail</span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  E-Posta
                </p>
                <p className="text-[14.5px] font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  merhaba@theluma.com
                </p>
                <span className="text-[11.5px] text-muted-foreground mt-0.5 block">Resmi ve kurumsal yazışma</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 2. MAIN SECTION: FORM + SIDEBAR ───────────────────────── */}
      <section className="mx-auto w-full max-w-[1240px] px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Info & Editorial Sidebar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-secondary font-bold mb-3">
                İLETİŞİM KANALLARI
              </p>
              <h2 className="font-serif text-[34px] md:text-[40px] font-semibold text-foreground leading-[1.15] mb-4">
                Her soru, yeni bir bağın başlangıcıdır.
              </h2>
              <p className="text-[16px] text-muted-foreground leading-[1.75] font-light">
                İster bir ürünün kullanım şeklini sorun, ister sevdikleriniz için özel bir hediye kutusu kurgulayın. Bize yazmaktan çekinmeyin.
              </p>
            </div>

            {/* Studio / Atelier Card */}
            <div className="p-7 rounded-[28px] bg-[#FAF7F4] border border-[#E8DFD8] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[19px]">location_on</span>
                </div>
                <h3 className="font-serif text-[20px] font-semibold text-foreground">
                  LUMA Stüdyo & Atölye
                </h3>
              </div>
              <p className="text-[14.5px] text-muted-foreground leading-[1.7] font-light mb-4">
                İstanbul, Türkiye<br />
                Üretim atölyemiz ve atölye çalışmalarımız yalnızca kayıtlı katılımcılar ve randevu alan misafirlerimiz için açıktır.
              </p>
              <div className="pt-3 border-t border-border/40 flex items-center gap-2 text-[12.5px] text-primary font-medium">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Randevu Talepleri: merhaba@theluma.com</span>
              </div>
            </div>

            {/* Editorial Brand Values Quote */}
            <div className="p-7 rounded-[28px] bg-secondary text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <span className="material-symbols-outlined text-white/30 text-[36px] mb-4 block">
                spa
              </span>
              <p className="font-serif italic text-[22px] leading-[1.4] text-white/95 mb-4">
                &quot;Kendinize ayırdığınız her dakika, bedeninize ve ruhunuza verilmiş sessiz bir armağandır.&quot;
              </p>
              <p className="text-[12px] uppercase tracking-wider text-white/60 font-semibold">
                — The Luma Ritüel Felsefesi
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/sss"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[16px] bg-card border border-border/70 hover:border-primary/40 text-[13.5px] font-medium text-foreground hover:text-primary transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px]">help_outline</span>
                <span>Sıkça Sorulan Sorular</span>
              </Link>
              <Link
                href="/workshop"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[16px] bg-card border border-border/70 hover:border-secondary/40 text-[13.5px] font-medium text-foreground hover:text-secondary transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px]">event</span>
                <span>Workshop Takvimi</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Modern Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* ─── 3. FAQ ACCORDION PREVIEW ──────────────────────────────── */}
      <section className="w-full bg-[#FAF7F4] py-20 md:py-24 border-t border-border/40">
        <div className="mx-auto w-full max-w-[1000px] px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.2em] text-secondary font-bold mb-3">
              SIKÇA SORULANLAR
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-semibold text-foreground">
              Hızlı Yanıtlar
            </h2>
            <p className="text-[15.5px] text-muted-foreground mt-2 font-light">
              Mesaj göndermeden önce merak ettiğiniz konuların yanıtlarını inceleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-7 rounded-[22px] bg-card border border-border/50 shadow-xs flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="font-serif text-[17px] font-semibold text-foreground leading-[1.35]">
                    {item.q}
                  </h3>
                </div>
                <p className="text-[14px] text-muted-foreground leading-[1.7] pl-9 font-light">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/sss"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline group"
            >
              <span>Tüm SSS maddelerini ve bakım rehberini gör</span>
              <span className="material-symbols-outlined text-[17px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
