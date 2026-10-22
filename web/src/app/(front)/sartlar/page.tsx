import LegalLayout from "@/components/legal/LegalLayout";

export const metadata = {
  alternates: { canonical: "/sartlar" },
  title: "Kullanım Şartları | LUMA",
  description: "The Luma web sitesi kullanım koşulları, telif hakları ve yasal uyarılar.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      currentSlug="sartlar"
      title="Kullanım Şartları"
      subtitle="Web Sitemizi Ziyaret Eden ve Hizmetlerimizden Yararlanan Kullanıcılar İçin Hükümler"
    >
      <p>
        <strong>theluma.com</strong> (&quot;Web Sitesi&quot;) web sitesine hoş geldiniz. İşbu Kullanım Şartları, The Luma (&quot;LUMA&quot;) tarafından işletilen bu web sitesine erişim sağlayan ve sitedeki içerik, ürün ve hizmetlerden faydalanan tüm kullanıcılar (&quot;Kullanıcı&quot; veya &quot;Ziyaretçi&quot;) için bağlayıcı kuralları belirlemektedir. Sitemizi ziyaret etmekle veya kullanmakla bu şartları kabul etmiş sayılırsınız.
      </p>

      <h2>1. Genel Kullanım Kuralları</h2>
      <p>
        Kullanıcılar web sitesini yalnızca hukuka uygun, dürüst ve meşru amaçlarla kullanmayı kabul ve taahhüt eder. Sitede yer alan formlar veya etkileşim kanalları aracılığıyla:
      </p>
      <ul>
        <li>Yanıltıcı, sahte veya üçüncü şahısların haklarını ihlal eden bilgiler vermemeyi,</li>
        <li>Sitenin güvenliğini tehdit edecek, sunucuları aşırı yükleyecek veya zararlı yazılım içeren girişimlerde bulunmamayı,</li>
        <li>Diğer kullanıcıların site deneyimini engelleyici eylemlerden kaçınmayı kabul etmiş olursunuz.</li>
      </ul>

      <h2>2. Fikri ve Sınai Mülkiyet Hakları</h2>
      <p>
        Web sitesinde yer alan; <strong>The Luma</strong> markası, logosu, sloganları, ürün tasarımları, metinler, fotoğraflar, grafikler, yazılım kodları ve tüm editoryal içerikler The Luma&apos;ya aittir ve ulusal/uluslararası telif hakları ile fikri mülkiyet mevzuatıyla korunmaktadır.
      </p>
      <p>
        The Luma&apos;nın önceden verilmiş açık ve yazılı izni olmaksızın; sitedeki hiçbir içerik kısmen veya tamamen kopyalanamaz, çoğaltılamaz, dağıtılamaz, yayımlanamaz veya ticari amaçla kullanılamaz. Kişisel ve ticari olmayan incelemeler bu kuralın istisnasıdır.
      </p>

      <h2>3. Ürünler ve Sağlık & Medikal Feragatname (Önemli Uyarı)</h2>
      <div className="p-6 rounded-[20px] bg-primary/5 border border-primary/20 my-6">
        <h3 className="text-primary font-serif font-semibold text-[18px] mb-2 mt-0">
          Önemli Tıbbi Bilgilendirme ve Uyarı
        </h3>
        <p className="text-[15px] text-[#4A3F35] leading-[1.7] mb-0 font-light">
          LUMA ürünleri (kiraz çekirdekli göz maskeleri, denge ve ağrı yastıkları, aromaterapi mumları ve bitki çayları); geleneksel doğal ısı/soğuk kompres yöntemleri ve aromaterapik rahatlama ritüelleri sunmak amacıyla tasarlanmıştır. Bu ürünler ve sitede paylaşılan blog/bilgi içerikleri <strong>hiçbir şekilde tıbbi teşhis, tedavi, reçete veya profesyonel doktor tavsiyesi yerine geçmez</strong>. Ciddi veya kronik sağlık sorunlarınız, dolaşım bozukluklarınız veya hamilelik durumunuz varsa ürünleri kullanmadan önce mutlaka hekiminize danışınız.
        </p>
      </div>

      <h2>4. Ürün Satışları ve Pazar Yeri Yönlendirmeleri</h2>
      <p>
        Sitemizde sergilenen ürünler, doğrudan The Luma resmi anlaşmalı pazar yeri mağazalarımız (<strong>Trendyol</strong> ve <strong>Hepsiburada</strong>) veya özel sipariş kanallarımız üzerinden satışa sunulmaktadır.
      </p>
      <ul>
        <li>
          Pazar yerleri üzerinden gerçekleştirdiğiniz alışverişlerde, ilgili platformun (Trendyol veya Hepsiburada) Mesafeli Satış Sözleşmesi, İptal/İade Politikası ve Ödeme Güvenliği kuralları geçerli olur.
        </li>
        <li>
          Ürün fiyatları, kampanyalar, indirimler ve stok durumları piyasa koşullarına göre önceden haber verilmeksizin güncellenebilir.
        </li>
      </ul>

      <h2>5. Workshop ve Atölye Kayıt Şartları</h2>
      <p>
        The Luma Studio bünyesinde düzenlenen workshop ve etkinlikler sınırlı kontenjanla gerçekleştirilir. Katılım onayları ödeme/rezervasyon sırasına göre kesinleşir. Mücbir sebepler haricinde etkinlik başlangıç tarihine 48 saatten az bir süre kala yapılan tek taraflı iptallerde kontenjan koruma sebebiyle ücret iadesi yapılamayabilir; ancak katılım hakkı bir sonraki atölyeye devredilebilir.
      </p>

      <h2>6. Sorumluluğun Sınırlandırılması</h2>
      <p>
        The Luma, web sitesinin kesintisiz, hatasız veya virüs gibi zararlı unsurlardan tamamen arındırılmış olduğunu garanti etmez; ancak en üst düzeyde güvenlik ve performans sağlamak için gerekli teknik özeni gösterir.
      </p>
      <p>
        Sitenin kullanımından, geçici erişim aksaklıklarından veya sitede yer alan bilgilere dayanarak gerçekleştirilen işlemlerden doğabilecek doğrudan ya da dolaylı zararlardan The Luma sorumlu tutulamaz.
      </p>

      <h2>7. Şartlarda Değişiklik ve Yürürlük</h2>
      <p>
        The Luma, işbu Kullanım Şartları&apos;nı tek taraflı olarak dilediği zaman değiştirme hakkına sahiptir. Değişiklikler sitede yayımlandığı andan itibaren yürürlüğe girer. Kullanıcıların şartları periyodik olarak kontrol etmesi önerilir.
      </p>

      <h2>8. Yetkili Mahkeme ve İletişim</h2>
      <p>
        İşbu Kullanım Şartları Türkiye Cumhuriyeti kanunlarına tabidir. Doğabilecek her türlü uyuşmazlığın çözümünde <strong>İstanbul Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
      </p>
      <p>
        Kullanım şartlarımızla ilgili her türlü soru, telif bildirimi veya iş birliği talebiniz için bize <strong>info@thelumaa.com.tr</strong> e-posta adresimizden ulaşabilirsiniz.
      </p>
    </LegalLayout>
  );
}
