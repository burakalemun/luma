import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog";

export const instant = false;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-32 selection:bg-[#B95B32]/20">
      
      {/* BREADCRUMB */}
      <div className="w-full pt-32 pb-8 px-6 md:px-12">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="flex items-center flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Anasayfa</Link>
            <span className="text-border font-light">/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Yayınlar</Link>
            <span className="text-border font-light">/</span>
            <span className="text-[#B95B32] font-medium">{post.category}</span>
          </div>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <section className="mx-auto w-full max-w-[800px] px-6 md:px-0 pt-4 pb-12 text-center">
        <h1 className="font-serif text-[42px] md:text-[54px] text-foreground leading-[1.1] mb-6">
          {post.title}
        </h1>
        <p className="text-[18px] md:text-[20px] text-[#4A3F35] font-light leading-[1.6]">
          {post.excerpt}
        </p>
      </section>

      {/* FEATURED IMAGE */}
      <section className="mx-auto w-full max-w-[1000px] px-6 md:px-0 mb-16">
        <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-[8px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="mx-auto w-full max-w-[700px] px-6 md:px-0 prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-[#4A3F35] prose-p:font-light prose-p:leading-[1.85] prose-a:text-[#B95B32]">
        <p className="text-[19px] leading-[1.85] text-[#4A3F35] font-light drop-cap first-letter:text-[60px] first-letter:font-serif first-letter:text-[#B95B32] first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]">
          {post.content}
        </p>
        
        {/* Placeholder for future extended content */}
        <p className="mt-6">
          Doğa, insanın kendini yeniden bulabileceği en büyük şifa kaynağıdır. Modern hayatın getirdiği hız, bizi kendi doğamızdan uzaklaştırırken; organik malzemelerin saf dokunuşları bizi tekrar merkezimize döndürür. Bu yazıda paylaştığımız detayların, kendi ritüelinizi oluşturmanıza ilham vermesini dileriz.
        </p>

        {/* MİNİ SSS KUTUCUKLARI (YAZI SONU) */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border/40">
            <h3 className="font-serif text-[28px] text-foreground mb-8">
              Sıkça Sorulan Sorular
            </h3>
            <div className="flex flex-col gap-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#FDFAF7] border border-border/30 rounded-[8px] p-6">
                  <h4 className="font-medium text-[16px] text-foreground mb-2">
                    Soru: <span className="font-semibold text-[#B95B32]">{faq.q}</span>
                  </h4>
                  <p className="text-[15px] text-muted-foreground font-light leading-[1.6]">
                    <span className="font-medium text-foreground">Cevap:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* FOOTER NAVIGATION */}
      <section className="mx-auto w-full max-w-[700px] px-6 md:px-0 mt-20 pt-8 border-t border-border/40 text-center">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-[12px] uppercase tracking-[0.2em] font-semibold text-[#B95B32] hover:text-foreground transition-colors"
        >
          ← Tüm Yayınlara Dön
        </Link>
      </section>

    </div>
  );
}
