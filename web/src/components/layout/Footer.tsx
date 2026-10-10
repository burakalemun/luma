import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#2A2118] py-16">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-white/10">
          <div>
            <h2 className="font-serif text-[18px] text-[#FDFAF7]">The Luma</h2>
            <p className="text-[13px] text-white/45 mt-1 font-sans">Doğal yaşam ritüelleri.</p>
          </div>
          
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <a href="https://instagram.com/thelumaa_" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <span className="text-[11px] font-bold text-white font-sans">IG</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <span className="text-[11px] font-bold text-[#C87C3A] font-sans">TY</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <span className="text-[11px] font-bold text-[#B86B35] font-sans">HB</span>
            </a>
          </div>
        </div>

        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 font-sans">
          {/* Col 1 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FDFAF7] text-[14px] font-semibold mb-2">Sayfalar</h3>
            <Link href="/" className="text-[14px] text-white/55 hover:text-white transition-colors">Anasayfa</Link>
            <Link href="/urunler" className="text-[14px] text-white/55 hover:text-white transition-colors">Ürünler</Link>
            <Link href="/blog" className="text-[14px] text-white/55 hover:text-white transition-colors">Blog</Link>
            <Link href="/sss" className="text-[14px] text-white/55 hover:text-white transition-colors">Sıkça Sorulan Sorular</Link>
            <Link href="/hakkimizda" className="text-[14px] text-white/55 hover:text-white transition-colors">Hikayemiz</Link>
          </div>
          
          {/* Col 2 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FDFAF7] text-[14px] font-semibold mb-2">Satın Al</h3>
            <Link href="#" className="text-[14px] text-[#C87C3A] hover:underline transition-colors">Trendyol Mağazası →</Link>
            <Link href="#" className="text-[14px] text-[#B86B35] hover:underline transition-colors">Hepsiburada Mağazası →</Link>
            <Link href="#" className="text-[14px] text-white/55 transition-colors">Güvenli Alışveriş</Link>
          </div>
          
          {/* Col 3 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FDFAF7] text-[14px] font-semibold mb-2">Blog</h3>
            <Link href="/blog" className="text-[14px] text-white/55 hover:text-white transition-colors">Doğal Isı Terapisi</Link>
            <Link href="/blog" className="text-[14px] text-white/55 hover:text-white transition-colors">Uyku Rutinleri</Link>
            <Link href="/blog" className="text-[14px] text-white/55 hover:text-white transition-colors">Wellness İpuçları</Link>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#FDFAF7] text-[14px] font-semibold mb-2">İletişim</h3>
            <a href="mailto:hello@theluma.com" className="text-[14px] text-white/55 hover:text-white transition-colors">hello@theluma.com</a>
            <a href="https://instagram.com/thelumaa_" className="text-[14px] text-white/55 hover:text-white transition-colors">@thelumaa_</a>
            <span className="text-[14px] text-white/55">İstanbul, Türkiye</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 font-sans">
          <p className="text-[12px] text-white/35">© 2025 The Luma.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-[12px] text-white/35 hover:text-white/60">Gizlilik</Link>
            <Link href="#" className="text-[12px] text-white/35 hover:text-white/60">Şartlar</Link>
            <Link href="#" className="text-[12px] text-white/35 hover:text-white/60">KVKK</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
