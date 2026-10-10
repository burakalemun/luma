export const metadata = {
  title: "İletişim | LUMA",
  description: "LUMA ile iletişime geçin. Sorularınız, iş birlikleri ve atölyeler hakkında bilgi almak için bize yazın.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      
      {/* HEADER SECTION */}
      <section className="w-full bg-[#FDFAF7] pt-32 pb-24 px-6 md:px-12 border-b border-border/30">
        <div className="mx-auto w-full max-w-[1200px] flex flex-col items-center text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B95B32] font-semibold mb-6">
            BİZE ULAŞIN
          </p>
          <h1 className="font-serif text-[42px] md:text-[56px] font-medium text-foreground leading-[1.1] mb-6">
            Sizi Dinliyoruz
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.8] font-light max-w-[600px]">
            LUMA ürünleri, kişisel ritüelleriniz, kurumsal hediye çözümleri veya iş birlikleri hakkında merak ettiğiniz her şey için bir mesaj uzağınızdayız.
          </p>
        </div>
      </section>

      {/* CONTACT INFO & FORM SECTION */}
      <section className="mx-auto w-full max-w-[1200px] px-6 lg:px-12 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT: INFO */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <h2 className="font-serif text-[32px] md:text-[40px] text-foreground mb-10 leading-tight">
              Bir fincan çay eşliğinde <br className="hidden lg:block"/> sorularınızı yanıtlayalım.
            </h2>

            <div className="flex flex-col gap-10">
              {/* Email */}
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
                  E-POSTA
                </h3>
                <a href="mailto:merhaba@theluma.com" className="text-[18px] text-foreground hover:text-[#B95B32] transition-colors font-light">
                  merhaba@theluma.com
                </a>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
                  SOSYAL MEDYA
                </h3>
                <a href="https://instagram.com/the.luma" target="_blank" rel="noopener noreferrer" className="text-[18px] text-foreground hover:text-[#B95B32] transition-colors font-light">
                  @the.luma
                </a>
              </div>

              {/* Studio */}
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">
                  LUMA STÜDYO (SADECE RANDEVU İLE)
                </h3>
                <p className="text-[16px] text-foreground font-light leading-[1.6] max-w-[250px]">
                  İstanbul, Türkiye<br />
                  <span className="text-[14px] text-muted-foreground mt-2 block">
                    (Atölye ziyaretleri ve yüz yüze görüşmeler için lütfen e-posta üzerinden randevu talep ediniz.)
                  </span>
                </p>
              </div>
            </div>
            
            {/* Aesthetic Image / Placeholder */}
            <div className="mt-16 w-full aspect-square bg-muted/20 rounded-[4px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" 
                alt="Luma Contact Lifestyle" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="w-full lg:w-7/12 flex flex-col pt-2">
            <form className="flex flex-col gap-12">
              
              {/* Name & Surname */}
              <div className="flex flex-col sm:flex-row gap-12 sm:gap-8">
                <div className="flex-1 flex flex-col group">
                  <label htmlFor="firstName" className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 group-focus-within:text-[#B95B32] transition-colors">
                    Adınız
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full bg-transparent border-b border-border/40 py-3 text-[16px] text-foreground font-light focus:outline-none focus:border-[#B95B32] transition-colors placeholder:text-muted-foreground/30"
                    placeholder="Adınızı giriniz"
                  />
                </div>
                <div className="flex-1 flex flex-col group">
                  <label htmlFor="lastName" className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 group-focus-within:text-[#B95B32] transition-colors">
                    Soyadınız
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full bg-transparent border-b border-border/40 py-3 text-[16px] text-foreground font-light focus:outline-none focus:border-[#B95B32] transition-colors placeholder:text-muted-foreground/30"
                    placeholder="Soyadınızı giriniz"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col group">
                <label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 group-focus-within:text-[#B95B32] transition-colors">
                  E-Posta Adresiniz
                </label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-border/40 py-3 text-[16px] text-foreground font-light focus:outline-none focus:border-[#B95B32] transition-colors placeholder:text-muted-foreground/30"
                  placeholder="ornek@email.com"
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col group">
                <label htmlFor="subject" className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 group-focus-within:text-[#B95B32] transition-colors">
                  Konu
                </label>
                <select 
                  id="subject" 
                  className="w-full bg-transparent border-b border-border/40 py-3 text-[16px] text-foreground font-light focus:outline-none focus:border-[#B95B32] transition-colors appearance-none cursor-pointer"
                >
                  <option value="Sipariş">Siparişim Hakkında</option>
                  <option value="Ürünler">Ürünler Hakkında</option>
                  <option value="İş Birliği">Kurumsal & İş Birliği</option>
                  <option value="Workshop">Workshop Detayları</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col group">
                <label htmlFor="message" className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2 group-focus-within:text-[#B95B32] transition-colors">
                  Mesajınız
                </label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-transparent border-b border-border/40 py-3 text-[16px] text-foreground font-light focus:outline-none focus:border-[#B95B32] transition-colors placeholder:text-muted-foreground/30 resize-none"
                  placeholder="Bize nasıl yardımcı olabileceğimizi anlatın..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="button"
                  className="bg-[#1b1510] hover:bg-[#B95B32] text-white h-[64px] px-12 text-[13px] tracking-widest font-semibold uppercase transition-colors duration-300 w-full sm:w-auto"
                >
                  Mesajı Gönder
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>
      
    </div>
  );
}
