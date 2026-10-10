import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-0 selection:bg-primary/20">
      
      {/* 1. HERO - EDITORIAL SPLIT */}
      <section className="relative w-full h-[75vh] min-h-[600px] flex flex-col md:flex-row border-b border-border/30">
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-[#FDFAF7]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-6">
            LUMA&apos;NIN DOĞUŞU
          </p>
          <h1 className="font-serif text-[42px] md:text-[5vw] text-foreground leading-[1.05] tracking-tight">
            Hikayemiz
          </h1>
          <p className="font-serif italic text-[22px] md:text-[28px] text-muted-foreground mt-6 leading-[1.4]">
            &quot;Sen de varsın.&quot;
          </p>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop" 
            alt="The Luma Story" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* 2. THE HOOK - NARROW TEXT */}
      <section className="mx-auto w-full max-w-[680px] px-6 py-24 md:py-32 text-center">
        <div className="space-y-8 text-[18px] md:text-[21px] text-[#4A3F35] leading-[1.8] font-light">
          <p>
            Her şey, kendime küçük ama gerçek bir <span className="italic font-serif">“durak”</span> yaratma ihtiyacıyla başladı. Gün içinde hızla akan zamanın içinde, derin bir nefes almak istediğim anlarda fark ettim ki biz kadınlar çoğu zaman kendimiz için hiçbir şey yapmadan günü tamamlıyoruz.
          </p>
          <p>
            Oysa bedenimiz, zihnimiz ve kalbimiz en çok da bizim şefkatimize ihtiyaç duyuyor.
          </p>
          <div className="w-[1px] h-16 bg-primary/30 mx-auto my-12" />
          <p className="font-serif text-[24px] md:text-[28px] leading-[1.5] text-foreground">
            LUMA işte tam da bu ihtiyaçtan doğdu. Yalnızca bir ürün markası değil; bir hatırlatıcı…
          </p>
        </div>
      </section>

      {/* 3. THE AUDIENCE - FULL WIDTH COLOR BLOCK */}
      <section className="w-full bg-[#F4EFEB] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[800px] px-6 text-center space-y-10">
          <p className="text-[17px] md:text-[19px] text-[#4A3F35] leading-[1.85] font-light">
            Bu marka; kendine dönen, iç sesini dinleyen, bazen yorulan ama her zaman yeniden ayağa kalkabilen kadınlara ithaf edildi. Çünkü her kadının içinde kendine ait, kimseye göstermediği bir alan vardır. Yorulduğunda sığındığı, kendini hatırladığı, nefes aldığı bir alan…
          </p>
          <p className="text-[17px] md:text-[19px] text-[#4A3F35] leading-[1.85] font-light">
            Benim için bu alan, yıllar boyunca ihmal ettiğim ama hep içimde var olan bir ihtiyaçtı: Kendime dönmek. Zamanla fark ettim ki bu ihtiyaç sadece bana ait değil. Yeni doğum yapmış bir anne, yoğun iş temposunda kaybolmuş bir kadın, sınav stresiyle mücadele eden bir genç kız, hayatının ve bedeninin değişen dönemlerinden geçen kadınlar… Hepsi aynı yerde buluşuyordu:
          </p>
          <h2 className="font-serif italic text-[32px] md:text-[42px] text-foreground leading-[1.3] pt-6">
            Biraz durmak, biraz dinlenmek ve kendine nazikçe sarılmak.
          </h2>
        </div>
      </section>

      {/* 4. THE FOUNDER & THE MOTHER - 2 COLUMN EDITORIAL */}
      <section className="w-full py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full md:w-1/2 aspect-[3/4] relative overflow-hidden rounded-t-[100px] rounded-b-[8px]">
            <img 
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1200&auto=format&fit=crop" 
              alt="Luma craftsmanship" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8 text-[17px] md:text-[19px] text-[#4A3F35] leading-[1.8] font-light">
            <h2 className="font-serif text-[32px] text-foreground mb-4">Ben İlayda.</h2>
            <p>
              İnce detaylara önem veren, estetik ve doğallık arasında denge kurmaya çalışan, duygularıyla düşünen ama adımlarını planla atan biriyim. Hayatı güzelleştiren şeyin küçük anlar olduğuna inandım hep. LUMA&apos;nın çıkış noktası da tam olarak buydu: Kadınların kendileriyle yeniden temas kurabileceği anlar yaratmak. Sessiz, sade ama içten.
            </p>
            <div className="pl-6 border-l-2 border-primary/30 py-2">
              <p className="font-serif text-[22px] text-foreground italic mb-4">
                Ve bu yolculukta yalnız değildim. theLUMA, iki kadının kalbinden doğan bir hikâye…
              </p>
              <p className="text-[16px]">
                Annem; yıllardır her şeyi sevgiyle üreten, emeğini kalbiyle birleştiren elleriyle… Ben ise içsel dengeyi, yavaşlamayı ve şefkati yeniden hatırlama arzusuyla…
              </p>
            </div>
            <p>
              Birlikte, insanların kendine dönmesine, yavaşlamasına ve iyi hissetmesine eşlik edecek doğal ritüeller yaratmak istedik. Annemin sevgisiyle şekillenen üretimler, benim zihnimde filizlenen &quot;nazikçe kendine dönüş&quot; fikriyle birleşti ve LUMA ortaya çıktı.
            </p>
          </div>
        </div>
      </section>

      {/* 5. THE TOUCH & THE RITUAL */}
      <section className="w-full bg-[#1b1510] text-white py-24 md:py-32">
        <div className="mx-auto w-full max-w-[900px] px-6 text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-[12px] uppercase tracking-[0.3em] text-white/50 font-semibold">
              LUMA&apos;NIN DOKUNUŞU
            </h2>
            <p className="font-serif text-[26px] md:text-[34px] leading-[1.4] text-white/90">
              Çünkü her kadın benzersiz. Ürünlerimiz doğal, sürdürülebilir ve tamamen el yapımı.
            </p>
            <p className="text-[17px] text-white/70 font-light max-w-[600px] mx-auto">
              Kumaşından içeriğine, kutusundan kokusuna kadar her detay sevgiyle düşünüldü. Her biri, küçük ama anlamlı bir ritüelin parçası. Bir sabahın sessizliğinde, bir akşamın yorgunluğunda ya da hayatın tam ortasında… Bir kadın kendine döndüğü an, LUMA başlıyor.
            </p>
          </div>
          
          <div className="w-[1px] h-24 bg-white/20 mx-auto" />

          <div className="space-y-8">
            <h2 className="text-[12px] uppercase tracking-[0.3em] text-white/50 font-semibold">
              BİR KUTUNUN İÇİNDE AÇILAN RİTÜEL ALANI
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-[700px] mx-auto pt-8">
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif italic text-[20px] text-white/90">Lavantalı mumun kokusunda gevşeyen omuzlar…</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif italic text-[20px] text-white/90">Sıcak ya da soğuk göz maskesiyle dinlenen bir beden…</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif italic text-[20px] text-white/90">Bir fincan bitki çayıyla sakinleşen düşünceler…</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="font-serif italic text-[20px] text-white/90">Ve ruhuna eşlik eden bir müzik listesi…</p>
              </div>
            </div>
            
            <div className="pt-16 pb-8">
              <p className="text-[14px] uppercase tracking-[0.2em] text-white/50 mb-6">Her bir LUMA kutusu,</p>
              <h3 className="font-serif italic text-[36px] md:text-[48px] text-[#C48C71]">
                &quot;Ben buradayım. Kendime değer veriyorum.&quot;
              </h3>
              <p className="text-[14px] uppercase tracking-[0.2em] text-white/50 mt-6">diyen bir kadına gidiyor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE INTENT & SIGNATURE */}
      <section className="mx-auto w-full max-w-[800px] px-6 py-24 md:py-32">
        <div className="space-y-10 text-[18px] md:text-[20px] text-[#4A3F35] leading-[1.8] font-light text-center">
          <p>
            LUMA yalnızca bir marka değil; bir niyet, bir iç sesin cevabı, şefkatli bir dokunuş. Ürünlerimizde doğanın kalbini, el emeğinin gücünü ve duygunun samimiyetini bulacaksınız. Lavantanın dinginliği, kiraz çekirdeğinin şifası, keten tohumunun yumuşaklığı… Hepsi bir deneyim sunmak için var. Ve o deneyim, sana ait.
          </p>
          <p>
            LUMA; kadının içsel gücünü yeniden hatırlaması için bir anahtar. Bazen bir sabah güneşiyle, bazen regl sancısıyla baş başa kaldığın bir akşamda, bazen stresli bir dönemde değişen ruh halinle… Çünkü LUMA, tüm bu anlarda yanında.
          </p>
          <p>
            Benim hayalim yalnızca güzel ürünler üretmek değil; kadınların kendilerini değerli hissetmelerine katkı sunmak. Çünkü inanıyorum ki küçük bir dokunuş bile bir kadının içindeki gücü yeniden hatırlatabilir.
          </p>
          <div className="pt-8">
            <p className="font-serif text-[26px] md:text-[32px] text-foreground leading-[1.4]">
              Her kadının kendi ritüeline ihtiyacı var. <br />
              <span className="italic text-primary">Ve LUMA, bu ritüelin kalbinde.</span>
            </p>
          </div>
          
          {/* Signature */}
          <div className="pt-16 flex flex-col items-center justify-center">
            <span className="font-serif italic text-[42px] text-primary mb-2">Sevgiyle, İlayda</span>
            <span className="text-[12px] text-muted-foreground uppercase tracking-[0.2em] mt-2 font-semibold">LUMA&apos;nın Kurucusu</span>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="w-full bg-[#FDFAF7] py-20 border-t border-border/30 text-center">
        <div className="mx-auto max-w-[600px] px-6">
          <h2 className="font-serif text-[28px] text-foreground mb-8">Kendi ritüelini başlatmaya hazır mısın?</h2>
          <Link href="/urunler" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-full h-[56px] px-12 text-[15px] tracking-wide uppercase transition-all duration-300">
            Koleksiyonu Keşfet
          </Link>
        </div>
      </section>

    </div>
  );
}
