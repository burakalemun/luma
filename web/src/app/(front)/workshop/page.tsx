import Link from "next/link";
import { getWorkshops } from "@/lib/workshops";
import { getLocalImage } from "@/lib/images";

export const instant = false;

export const metadata = {
  title: "Workshop & Atölyeler | LUMA",
  description: "Luma ile ruhunuzu dinlendirecek ve iyi yaşam pratiklerini keşfedeceğiniz atölye çalışmalarına katılın.",
};

export default async function WorkshopPage() {
  const workshops = await getWorkshops();
  const heroImg = getLocalImage(
    "images/workshop-hero",
    "/images/workshop-hero.jpg"
  );

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-[#B95B32]/20">
      
      {/* HERO SECTION */}
      <section className="w-full relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Luma Workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto flex flex-col items-center">
          <p className="text-[12px] uppercase tracking-[0.4em] text-white/80 font-semibold mb-6">
            LUMA TOPLULUĞU
          </p>
          <h1 className="font-serif text-[42px] md:text-[64px] font-medium text-white leading-[1.1] mb-8 drop-shadow-lg">
            Birlikte Yavaşlıyoruz
          </h1>
          <p className="text-[18px] md:text-[22px] text-white/90 leading-[1.8] font-light max-w-[600px] drop-shadow-md">
            Kendinize ayırdığınız birkaç saat, ruhunuzda uzun bir mola. Doğal kokular ve şifalı dokunuşlar eşliğinde kendi ritüelinizi yaratmaya davetlisiniz.
          </p>
        </div>
      </section>

      {/* UPCOMING WORKSHOPS */}
      <section className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-[36px] text-foreground mb-4">Yaklaşan Atölyeler</h2>
          <div className="w-12 h-[1px] bg-[#B95B32]"></div>
        </div>

        {workshops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-border/40 rounded-[20px] bg-[#FDFAF7] text-center max-w-[700px] mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#B95B32]/10 flex items-center justify-center text-[#B95B32] mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="font-serif text-[26px] font-medium text-foreground mb-3">
              Şu An Aktif Bir Atölye Programı Bulunmuyor
            </h3>
            <p className="text-[15px] text-muted-foreground leading-[1.7] font-light max-w-[500px] mb-8">
              Yeni dönem atölye takvimimiz çok yakında açıklanacaktır. Duyuruları kaçırmamak için bizi Instagram hesabımızdan takip edebilir veya iletişime geçebilirsiniz.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a
                href="https://instagram.com/thelumaa_"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#1b1510] text-white text-[12px] font-semibold tracking-widest uppercase hover:bg-[#B95B32] transition-colors rounded-[14px]"
              >
                Instagram&apos;da Takip Et
              </a>
              <Link
                href="/iletisim"
                className="px-7 py-3.5 border border-border text-foreground text-[12px] font-semibold tracking-widest uppercase hover:border-[#B95B32] hover:text-[#B95B32] transition-colors rounded-[14px]"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {workshops.map((workshop, idx) => (
              <div key={idx} className="group flex flex-col border border-border/40 rounded-[20px] overflow-hidden bg-white hover:border-[#B95B32]/40 transition-colors duration-500 shadow-sm">
                
                {/* Image & Badges */}
                <div className="relative w-full aspect-[4/3] bg-muted/20 overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                  
                  {/* Type Badge (Fiziksel / Online) */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-foreground text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase shadow-sm rounded-full">
                    {workshop.type}
                  </div>

                  {/* Spots Left Warning */}
                  {workshop.spotsLeft > 0 && workshop.spotsLeft <= 3 && (
                    <div className="absolute bottom-4 right-4 bg-[#B95B32] text-white text-[10px] font-semibold tracking-widest px-3 py-1.5 uppercase shadow-sm rounded-full animate-pulse">
                      Son {workshop.spotsLeft} Yer
                    </div>
                  )}
                  
                  {/* Sold out */}
                  {workshop.spotsLeft === 0 && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                       <div className="border border-white/40 text-white px-8 py-3 tracking-[0.3em] text-[13px] uppercase font-semibold rounded-[14px]">
                         Doldu
                       </div>
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex flex-col p-8 flex-1">
                  <div className="flex items-center gap-4 text-[12px] uppercase tracking-widest text-[#B95B32] font-semibold mb-4">
                    <span>{workshop.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#B95B32]"></span>
                    <span>{workshop.time}</span>
                  </div>
                  
                  <h3 className="font-serif text-[24px] font-medium text-foreground leading-[1.2] mb-4">
                    {workshop.title}
                  </h3>
                  
                  <p className="text-[15px] text-muted-foreground leading-[1.7] font-light mb-8 flex-1">
                    {workshop.description}
                  </p>

                  <div className="flex flex-col gap-5 mt-auto pt-6 border-t border-border/40">
                    <div className="flex items-center justify-between text-[14px] text-foreground font-medium">
                      <span className="font-light text-muted-foreground flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {workshop.location}
                      </span>
                      <span>{workshop.price}</span>
                    </div>
                    
                    {workshop.spotsLeft === 0 ? (
                      <button 
                        disabled
                        className="w-full h-[52px] text-[12px] tracking-[0.2em] font-semibold uppercase transition-colors duration-300 bg-muted text-muted-foreground cursor-not-allowed rounded-[14px]"
                      >
                        Kayıtlar Kapandı
                      </button>
                    ) : (
                      <Link 
                        href="/iletisim"
                        className="w-full h-[52px] text-[12px] tracking-[0.2em] font-semibold uppercase transition-colors duration-300 bg-[#1b1510] text-white hover:bg-[#B95B32] flex items-center justify-center rounded-[14px]"
                      >
                        Yerini Ayırt
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* B2B / CORPORATE BANNER */}
      <section className="mx-auto w-full max-w-[1320px] px-6 lg:px-12 mb-12">
        <div className="w-full bg-[#FDFAF7] border border-[#B95B32]/10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 rounded-[20px]">
          <div className="flex flex-col md:w-2/3">
            <h3 className="font-serif text-[32px] text-foreground mb-4">Kurumsal & Özel Atölyeler</h3>
            <p className="text-[16px] text-muted-foreground leading-[1.7] font-light">
              Ekibinizin stres seviyesini düşürmek ve motivasyonunu artırmak için ofisinizde veya stüdyomuzda şirketinize özel, kapalı grup wellness atölyeleri düzenliyoruz. Kurumsal etkinlik planlaması için bizimle iletişime geçin.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-end">
             <Link 
                href="/iletisim" 
                className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-background h-[54px] px-8 text-[12px] tracking-[0.2em] font-semibold uppercase transition-colors duration-300 flex items-center justify-center whitespace-nowrap rounded-[14px]"
              >
                Bizimle İletişime Geçin
              </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
