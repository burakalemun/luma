import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  groups: [
    { name: "all", title: "📋 Tüm Alanlar (Tek Sayfa)", default: true },
    { name: "marketplaces", title: "🔗 Buton Linkleri (Trendyol / HB)" },
    { name: "content", title: "📝 İçerik Metinleri & Hikaye" },
    { name: "media", title: "🖼️ Görseller & Galeri" },
    { name: "features", title: "🌿 Terapi Rehberi & İçerik" },
    { name: "general", title: "📌 Temel Bilgiler & Fiyat" },
  ],
  fieldsets: [
    {
      name: "general",
      title: "📌 1. Temel Bilgiler & Kategori",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "marketplaces",
      title: "🔗 2. Buton Linkleri (Trendyol & Hepsiburada Satın Al)",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "media",
      title: "🖼️ 3. Ürün Görselleri & Galeri",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "content",
      title: "📝 4. İçerik Metinleri, Açıklamalar & Ritüel",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "features",
      title: "🌿 5. Özellikler, Kutu İçeriği & Terapi Rehberi",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ==========================================
    // 1. TEMEL BİLGİLER
    // ==========================================
    defineField({
      name: "title",
      title: "Ürün Adı",
      description: "Örn: LUMA Ritual Box, LUMA Touch Cherry",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
      validation: (Rule) => Rule.required().error("Ürün adı zorunludur."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL Uzantısı)",
      description: "Ürün bağlantı adresi (örn: luma-ritual-box). 'Generate' ile otomatik üretilebilir.",
      type: "slug",
      group: ["all", "general"],
      fieldset: "general",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug zorunludur."),
    }),
    defineField({
      name: "subtitle",
      title: "Alt Başlık / Slogan",
      description: "Örn: Günün yükünü bırak, kendine nazikçe dön.",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
    }),
    defineField({
      name: "category",
      title: "Ana Kategori",
      description: "Ürünün birincil kategorisi",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
      options: {
        list: [
          { title: "Ritüel Kutuları", value: "Ritüel Kutuları" },
          { title: "Göz Maskeleri", value: "Göz Maskeleri" },
          { title: "Denge Yastıkları", value: "Denge Yastıkları" },
          { title: "Ağrı Yastıkları", value: "Ağrı Yastıkları" },
          { title: "Mumlar", value: "Mumlar" },
        ],
      },
      validation: (Rule) => Rule.required().error("Kategori seçimi zorunludur."),
    }),
    defineField({
      name: "categories",
      title: "Ek / Çoklu Kategoriler (Filtreleme)",
      description: "Ürünün listelenebileceği ek kategoriler",
      type: "array",
      of: [{ type: "string" }],
      group: ["all", "general"],
      fieldset: "general",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "price",
      title: "Fiyat (Opsiyonel)",
      description: "Örn: ₺590 veya boş bırakabilirsiniz",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
    }),
    defineField({
      name: "badge",
      title: "Rozet / Etiket Metni (Opsiyonel)",
      description: "Örn: RİTÜEL KUTUSU, YENİ SERİ, EN ÇOK SATAN (Boş bırakılabilir)",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
    }),
    defineField({
      name: "badgeBg",
      title: "Rozet Rengi (Tema)",
      type: "string",
      group: ["all", "general"],
      fieldset: "general",
      options: {
        list: [
          { title: "Toprak Kahve (Standart)", value: "bg-[#4A3F35]" },
          { title: "Kiremit Kırmızı (Vurgulu)", value: "bg-[#B95B32]" },
          { title: "Adaçayı Yeşili", value: "bg-[#5B7065]" },
          { title: "Sıcak Amber", value: "bg-[#C5947A]" },
        ],
      },
      initialValue: "bg-[#4A3F35]",
    }),
    defineField({
      name: "order",
      title: "Vitrin Sıralama Numarası",
      description: "Küçük sayılar önce gösterilir (1, 2, 3...)",
      type: "number",
      group: ["all", "general"],
      fieldset: "general",
      initialValue: 10,
    }),
    defineField({
      name: "isFeatured",
      title: "Anasayfada Öne Çıkarılsın mı?",
      description: "Seçilirse anasayfadaki koleksiyon vitrininde görünür.",
      type: "boolean",
      group: ["all", "general"],
      fieldset: "general",
      initialValue: true,
    }),

    // ==========================================
    // 2. BUTON LİNKLERİ (PAZARYERLERİ)
    // ==========================================
    defineField({
      name: "trendyolUrl",
      title: "🟠 Trendyol Buton Linki (Satın Al)",
      description: "Ürün detay sayfasındaki turuncu 'Trendyol ile Satın Al' butonunun yönleneceği link.",
      type: "url",
      group: ["all", "marketplaces"],
      fieldset: "marketplaces",
    }),
    defineField({
      name: "hbUrl",
      title: "🟠 Hepsiburada Buton Linki (Satın Al)",
      description: "Ürün detay sayfasındaki turuncu 'Hepsiburada ile Satın Al' butonunun yönleneceği link.",
      type: "url",
      group: ["all", "marketplaces"],
      fieldset: "marketplaces",
    }),

    // ==========================================
    // 3. GÖRSELLER & GALERİ
    // ==========================================
    defineField({
      name: "mainImage",
      title: "Ana Görsel (Kapak Fotoğrafı)",
      description: "Ürünün vitrinde ve detay sayfasında ilk görünen ana kapak görseli. Buradan değiştirebilir veya yükleyebilirsiniz.",
      type: "image",
      group: ["all", "media"],
      fieldset: "media",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Ürün Galerisi (Ek Görseller)",
      description: "Ürün detay sayfasındaki galeri için ek fotoğraflar. İstediğiniz sırayla ekleyip silebilirsiniz.",
      type: "array",
      group: ["all", "media"],
      fieldset: "media",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "mainImageUrl",
      title: "Harici Ana Görsel URL'si (Yedek)",
      description: "Eğer Sanity görseli yerine doğrudan URL linki kullanılacaksa",
      type: "string",
      group: ["all", "media"],
      fieldset: "media",
    }),
    defineField({
      name: "galleryUrls",
      title: "Harici Galeri URL'leri (Yedek)",
      description: "Yedek harici resim adresleri listesi",
      type: "array",
      of: [{ type: "string" }],
      group: ["all", "media"],
      fieldset: "media",
    }),

    // ==========================================
    // 4. İÇERİK METİNLERİ & AÇIKLAMALAR
    // ==========================================
    defineField({
      name: "shortDesc",
      title: "Kısa Açıklama Metni",
      description: "Ürün kartlarında ve başlığın hemen altında gösterilen 1-2 cümlelik vurucu özet metin.",
      type: "text",
      rows: 3,
      group: ["all", "content"],
      fieldset: "content",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "longDesc",
      title: "LUMA Dokunuşu / Detaylı Hikaye Metni",
      description: "Ürün detay sayfasında akordeon veya açıklama alanında yer alan zengin anlatım metni.",
      type: "text",
      rows: 5,
      group: ["all", "content"],
      fieldset: "content",
    }),
    defineField({
      name: "message",
      title: "Ritüel Alıntısı (Büyük Söz / Quote)",
      description: 'Detay sayfasında büyük harflerle vurgulanan niyet/ritüel cümlesi. Örn: "Gözlerini kapat, dünyanın sesini susturalım."',
      type: "string",
      group: ["all", "content"],
      fieldset: "content",
    }),

    // ==========================================
    // 5. ÖZELLİKLER, KUTU İÇERİĞİ & TERAPİ REHBERİ
    // ==========================================
    defineField({
      name: "isHeated",
      title: "Isıtılabilir / Soğutulabilir Ürün mü?",
      description: "Açık olduğunda 'Organik ve Çift Katlı Vurgusu' kutusu ve Sıcak/Soğuk Terapi rehberi gösterilir.",
      type: "boolean",
      group: ["all", "features"],
      fieldset: "features",
      initialValue: true,
    }),
    defineField({
      name: "contents",
      title: "Kutu İçeriği & İçindekiler (Madde Madde)",
      description: "Her satırda bir madde (Örn: 1 Adet LUMA Touch Cherry, Organik pamuk ve müslin kumaş)",
      type: "array",
      of: [{ type: "string" }],
      group: ["all", "features"],
      fieldset: "features",
    }),
    defineField({
      name: "usageAreas",
      title: "Kullanım Alanları (Madde Madde)",
      description: "Örn: Migren ve baş ağrılarında destekleyici kullanım, Uyku öncesi sakinleştirici etki",
      type: "array",
      of: [{ type: "string" }],
      group: ["all", "features"],
      fieldset: "features",
    }),
    defineField({
      name: "usageHot",
      title: "Sıcak Terapi Rehberi Metni (Mikrodalga & Fırın)",
      description: "Isıtma süreleri ve uygulama talimatı metni",
      type: "text",
      rows: 3,
      group: ["all", "features"],
      fieldset: "features",
    }),
    defineField({
      name: "usageCold",
      title: "Soğuk Terapi Rehberi Metni (Dondurucu & Buzdolabı)",
      description: "Soğutma süreleri ve uygulama talimatı metni",
      type: "text",
      rows: 3,
      group: ["all", "features"],
      fieldset: "features",
    }),
    defineField({
      name: "care",
      title: "Bakım ve Saklama Koşulları Metni",
      description: "Yıkama talimatları ve saklama önerileri metni",
      type: "text",
      rows: 3,
      group: ["all", "features"],
      fieldset: "features",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
