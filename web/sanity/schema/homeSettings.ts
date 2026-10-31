import { defineField, defineType } from "sanity";

export default defineType({
  name: "homeSettings",
  title: "🏠 Anasayfa Yönetimi",
  type: "document",
  fieldsets: [
    {
      name: "hero",
      title: "✨ 1. Hero (Giriş) Bölümü",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "whyLuma",
      title: "🌿 2. Neden LUMA? Bölümü",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "quote",
      title: "💬 3. Büyük Marka Alıntısı (Quote Strip)",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ==========================================
    // 1. HERO BÖLÜMÜ
    // ==========================================
    defineField({
      name: "heroBadge",
      title: "Hero Üst Rozet / Etiket Metni",
      description: "Örn: DOĞAL ISI TERAPİSİ",
      type: "string",
      fieldset: "hero",
      initialValue: "DOĞAL ISI TERAPİSİ",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Ana Başlık",
      description: "Örn: Doğanın Sıcaklığını Bedeninize Taşıyın",
      type: "string",
      fieldset: "hero",
      initialValue: "Doğanın Sıcaklığını Bedeninize Taşıyın",
    }),
    defineField({
      name: "heroTitleHighlight",
      title: "Hero Başlığında Renkli Vurgulanacak Kelime",
      description: "Başlık içinde turuncu renkle vurgulanacak kelime (Örn: Bedeninize)",
      type: "string",
      fieldset: "hero",
      initialValue: "Bedeninize",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Açıklama Metni",
      description: "Başlığın altındaki tanıtım paragrafı",
      type: "text",
      rows: 3,
      fieldset: "hero",
      initialValue:
        "Geleneksel kiraz çekirdeği termoterapisi ve organik keten kumaşlarla bedeninizi dinlendirin. Her ürün özenle el yapımı.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Ana Görseli (Sağdaki Büyük Fotoğraf)",
      description: "Anasayfa girişindeki ana kapak fotoğrafı. Bilgisayarınızdan yükleyebilir veya değiştirebilirsiniz.",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroFloatingCardTitle",
      title: "Hero Görseli Üzerindeki Kayan Kart Başlığı",
      description: "Görselin sol altındaki küçük beyaz kartın başlığı (Örn: Doğal Kiraz Çekirdeği)",
      type: "string",
      fieldset: "hero",
      initialValue: "Doğal Kiraz Çekirdeği",
    }),
    defineField({
      name: "heroFloatingCardSubtitle",
      title: "Hero Kayan Kart Alt Başlığı",
      description: "Örn: Geleneksel Isıl Terapi",
      type: "string",
      fieldset: "hero",
      initialValue: "Geleneksel Isıl Terapi",
    }),
    defineField({
      name: "heroPrimaryButtonText",
      title: "Birinci Buton Metni",
      type: "string",
      fieldset: "hero",
      initialValue: "Ürünleri İncele",
    }),
    defineField({
      name: "heroPrimaryButtonLink",
      title: "Birinci Buton Bağlantısı",
      type: "string",
      fieldset: "hero",
      initialValue: "/urunler",
    }),
    defineField({
      name: "heroSecondaryButtonText",
      title: "İkinci Buton Metni",
      type: "string",
      fieldset: "hero",
      initialValue: "Hikayemizi Oku",
    }),
    defineField({
      name: "heroSecondaryButtonLink",
      title: "İkinci Buton Bağlantısı",
      type: "string",
      fieldset: "hero",
      initialValue: "/hakkimizda",
    }),

    // ==========================================
    // 2. NEDEN LUMA BÖLÜMÜ
    // ==========================================
    defineField({
      name: "whyLumaBadge",
      title: "Neden Luma Üst Başlık / Rozet",
      type: "string",
      fieldset: "whyLuma",
      initialValue: "NEDEN LUMA?",
    }),
    defineField({
      name: "whyLumaTitle",
      title: "Neden Luma Ana Başlık",
      type: "string",
      fieldset: "whyLuma",
      initialValue: "Doğallık, El Emeği, Şifa",
    }),
    defineField({
      name: "whyLumaItems",
      title: "Neden Luma Maddeleri (4 Kart)",
      type: "array",
      fieldset: "whyLuma",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "İkon Adı (Material Icon: eco, handyman, thermostat, favorite vb.)", type: "string" },
            { name: "title", title: "Kart Başlığı", type: "string" },
            { name: "desc", title: "Kart Açıklaması", type: "text", rows: 2 },
          ],
        },
      ],
    }),

    // ==========================================
    // 3. BÜYÜK ALINTI / SLOGAN BÖLÜMÜ (QUOTE STRIP)
    // ==========================================
    defineField({
      name: "quoteText",
      title: "Büyük Alıntı / Slogan Cümlesi",
      description: 'Anasayfanın altındaki kahverengi şerit üzerinde büyük harflerle yazan slogan',
      type: "string",
      fieldset: "quote",
      initialValue: "Sıcaklık iyileştirir, doğa dengeler.",
    }),
    defineField({
      name: "quoteSubtext",
      title: "Alıntı Alt Metni / Açıklama",
      type: "text",
      rows: 3,
      fieldset: "quote",
      initialValue:
        "Her ürünümüz, yoğun günlerin ardından bedeninize ve zihninize hak ettiği molayı vermek için özenle elde üretilir.",
    }),
    defineField({
      name: "quoteButtonText",
      title: "Alıntı Buton Metni",
      type: "string",
      fieldset: "quote",
      initialValue: "Hikayemizi Keşfet",
    }),
    defineField({
      name: "quoteButtonLink",
      title: "Alıntı Buton Bağlantısı",
      type: "string",
      fieldset: "quote",
      initialValue: "/hakkimizda",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "🏠 Anasayfa İçerik & Görsel Yönetimi",
        subtitle: "Hero başlığı, görselleri, sloganlar ve Neden LUMA alanları",
      };
    },
  },
});
