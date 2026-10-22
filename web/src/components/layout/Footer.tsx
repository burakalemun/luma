import Link from "next/link";
import {
  TRENDYOL_STORE_URL,
  HEPSIBURADA_STORE_URL,
  TrendyolIcon,
  HepsiburadaIcon,
} from "@/components/ui/MarketplaceBrand";

export function Footer() {
  return (
    <footer className="bg-[#2A2118] py-16">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-white/10">
          <Link href="/" className="flex items-center group" aria-label="The Luma Ana Sayfa">
            <img
              src="/images/logo-mark-white.png"
              alt="The Luma"
              className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <a href="https://instagram.com/thelumaa_" target="_blank" rel="noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Instagram">
              <span className="text-[11px] font-bold text-white font-sans">IG</span>
            </a>
            <a
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Luma Trendyol Mağazası"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F27A1A]/20 hover:bg-[#F27A1A] text-[#F27A1A] hover:text-white transition-all duration-200 border border-[#F27A1A]/30"
            >
              <TrendyolIcon className="w-4 h-4 fill-current" color="currentColor" />
            </a>
            <a
              href={HEPSIBURADA_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="The Luma Hepsiburada Mağazası"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FF6000]/20 hover:bg-[#FF6000] text-[#FF6000] hover:text-white transition-all duration-200 border border-[#FF6000]/30"
            >
              <HepsiburadaIcon className="w-4 h-4 fill-current" color="currentColor" />
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
            <a
              href={TRENDYOL_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors"
            >
              <span className="w-5 h-5 rounded-md bg-[#F27A1A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <TrendyolIcon className="w-3 h-3 fill-white" color="#ffffff" />
              </span>
              <span className="group-hover:text-[#F27A1A] transition-colors">Trendyol Mağazası</span>
              <span className="text-white/40 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={HEPSIBURADA_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors"
            >
              <span className="w-5 h-5 rounded-md bg-[#FF6000] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <HepsiburadaIcon className="w-3 h-3 fill-white" color="#ffffff" />
              </span>
              <span className="group-hover:text-[#FF6000] transition-colors">Hepsiburada Mağazası</span>
              <span className="text-white/40 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <Link href="/sss" className="text-[14px] text-white/55 hover:text-white transition-colors">Güvenli Alışveriş & SSS</Link>
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
            <a href="mailto:info@thelumaa.com.tr" className="text-[14px] text-white/55 hover:text-white transition-colors">info@thelumaa.com.tr</a>
            <a href="tel:+905358296000" className="text-[14px] text-white/55 hover:text-white transition-colors">0535 829 60 00</a>
            <a href="https://instagram.com/thelumaa_" className="text-[14px] text-white/55 hover:text-white transition-colors">@thelumaa_</a>
            <span className="text-[14px] text-white/55">İstanbul, Türkiye</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/10 font-sans">
          <p className="text-[12px] text-white/35">© 2025 The Luma.</p>
          <div className="flex items-center gap-5 mt-4 sm:mt-0">
            <Link href="/gizlilik" className="text-[12px] text-white/45 hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/sartlar" className="text-[12px] text-white/45 hover:text-white transition-colors">Kullanım Şartları</Link>
            <Link href="/kvkk" className="text-[12px] text-white/45 hover:text-white transition-colors">KVKK</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
