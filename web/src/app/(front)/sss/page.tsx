import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Sıkça Sorulan Sorular | LUMA",
  description: "Luma ürünleri, doğal yaşam ve ruh sağlığı hakkında merak ettiğiniz her şey.",
};

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategoryGroup {
  category: string;
  items: FAQItem[];
}

const DEFAULT_FAQ_GROUPS: FAQCategoryGroup[] = [
  {
    category: "Sipariş & Teslimat",
    items: [
      {
        q: "Siparişlerimi nereden verebilirim?",
        a: "Resmi Trendyol ve Hepsiburada mağazalarımız üzerinden güvenle sipariş oluşturabilirsiniz. Tüm ürünlerimiz orijinal ambalajında ve özenle paketlenerek gönderilir."
      },
      {
        q: "Kargo ne kadar sürede teslim edilir?",
        a: "Siparişleriniz genellikle 1-2 iş günü içerisinde kargoya teslim edilir. Kargo takip numaranız ilgili pazar yeri üzerinden tarafınıza iletilir."
      },
    ]
  },
  {
    category: "Ürünler & Doğal Malzemeler",
    items: [
      {
        q: "Luma ürünlerinde hangi malzemeler kullanılır?",
        a: "Ürünlerimizde %100 doğal keten kumaş, organik kurutulmuş lavanta taneleri ve temizlenmiş doğal kiraz çekirdekleri kullanılır. Hiçbir kimyasal veya sentetik katkı maddesi içermez."
      },
      {
        q: "Göz maskesi ve ısı yastığı nasıl ısıtılır ve soğutulur?",
        a: "Sıcak terapi için mikrodalga fırında düşük ısıda 30-40 saniye veya kalorifer peteği üzerinde ısıtabilirsiniz. Soğuk terapi için ise buzdolabı poşetine koyarak dondurucuda 20-30 dakika bekletebilirsiniz."
      },
    ]
  },
  {
    category: "İade & Değişim",
    items: [
      {
        q: "İade koşulları nelerdir?",
        a: "Satın aldığınız ürünleri, Trendyol ve Hepsiburada pazar yeri kuralları çerçevesinde 14 gün içerisinde kolayca iade edebilirsiniz."
      }
    ]
  }
];

export default async function FAQPage() {
  const posts = await getBlogPosts();

  // CMS'teki blog yazılarından gelen SSS'leri topla
  const cmsGroups: FAQCategoryGroup[] = [];
  const categoryMap = new Map<string, FAQItem[]>();

  posts.forEach((post) => {
    if (post.faqs && post.faqs.length > 0) {
      const cat = post.category || "Genel";
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat)?.push(...post.faqs);
    }
  });

  categoryMap.forEach((items, category) => {
    cmsGroups.push({ category, items });
  });

  const displayGroups = cmsGroups.length > 0 ? [...cmsGroups, ...DEFAULT_FAQ_GROUPS] : DEFAULT_FAQ_GROUPS;

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background selection:bg-primary/20">
      
      {/* PAGE HEADER */}
      <section className="w-full bg-[#FDFAF7] pt-32 pb-20 px-6 border-b border-border/30">
        <div className="mx-auto w-full max-w-[800px] text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#B95B32] font-semibold mb-6">
            YARDIM & DESTEK
          </p>
          <h1 className="font-serif text-[42px] md:text-[52px] font-medium text-foreground leading-[1.1] mb-6">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-[17px] text-muted-foreground leading-[1.8] font-light max-w-[600px]">
            LUMA ritüelleri, doğal yaşam ve ürün kullanım detayları hakkında aklınıza takılan her şeyi burada yanıtlıyoruz.
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="mx-auto w-full max-w-[1000px] px-6 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col gap-20">
          {displayGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              
              {/* CATEGORY TITLE - LEFT SIDE */}
              <div className="w-full md:w-1/3 md:sticky md:top-32">
                <h2 className="font-serif text-[28px] text-foreground leading-tight">
                  {group.category}
                </h2>
                <div className="w-8 h-[1px] bg-[#B95B32] mt-6"></div>
              </div>

              {/* ACCORDIONS - RIGHT SIDE */}
              <div className="w-full md:w-2/3 flex flex-col gap-4">
                {group.items.map((faq, faqIdx) => (
                  <details 
                    key={faqIdx} 
                    className="group bg-transparent border-b border-border/40 pb-4 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none py-2 text-[17px] font-medium text-foreground hover:text-[#B95B32] transition-colors">
                      <span className="pr-8">{faq.q}</span>
                      <span className="transition group-open:rotate-180 flex-shrink-0 text-[#B95B32]">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-muted-foreground text-[15px] font-light leading-[1.7] mt-3 pr-4 animate-in fade-in duration-300 slide-in-from-top-1">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto w-full max-w-[1000px] px-6 mt-12">
        <div className="bg-[#fcf8f5] rounded-[24px] p-10 md:p-16 text-center border border-border/30">
          <h3 className="font-serif text-[28px] text-foreground mb-4">Aradığınız cevabı bulamadınız mı?</h3>
          <p className="text-[16px] text-muted-foreground font-light mb-8">
            Daha fazla detay için iletişim sayfamızdan bizimle doğrudan iletişime geçebilirsiniz.
          </p>
          <Link 
            href="/iletisim" 
            className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#B95B32] h-[52px] px-10 text-[12px] tracking-[0.2em] font-semibold uppercase transition-colors duration-300 rounded-full"
          >
            Bize Ulaşın
          </Link>
        </div>
      </section>
      
    </div>
  );
}
