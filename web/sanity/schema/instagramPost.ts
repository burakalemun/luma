import { defineField, defineType } from "sanity";

export default defineType({
  name: "instagramPost",
  title: "Instagram Vitrini",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Gönderi / Video Başlığı",
      type: "string",
      description: "Ana sayfada görselin altında görünecek kısa açıklama (örn: Luma Warm Hug nasıl kullanılır?)",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "type",
      title: "İçerik Türü",
      type: "string",
      description: "Reel videosu mu yoksa fotoğraf gönderisi mi?",
      options: {
        list: [
          { title: "🎥 Reel Videosu", value: "reel" },
          { title: "📷 Fotoğraf / Post", value: "post" },
        ],
        layout: "radio",
      },
      initialValue: "reel",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaUrl",
      title: "Instagram Bağlantısı (URL)",
      type: "url",
      description: "Tıklanınca yönlendirilecek Instagram Reel/Post veya Profil linki",
      initialValue: "https://instagram.com/thelumaa_",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "image",
      title: "Kapak Görseli",
      type: "image",
      description: "Instagram reels kapağı veya fotoğrafı",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageUrl",
      title: "Harici Görsel Linki (Opsiyonel)",
      type: "url",
      description: "Dosya yüklemek yerine doğrudan bir görsel linki (CDN veya Unsplash) yapıştırmak isterseniz",
    }),
    defineField({
      name: "views",
      title: "Görüntülenme / Etiket Metni (Opsiyonel)",
      type: "string",
      description: "Örn: 12K, 8.5K veya Yeni (Boş bırakılırsa gösterilmez)",
    }),
    defineField({
      name: "order",
      title: "Sıralama Önceliği",
      type: "number",
      description: "Ana sayfadaki görünüm sırası (1'den 5'e kadar)",
      initialValue: 1,
    }),
    defineField({
      name: "isActive",
      title: "Yayında mı?",
      type: "boolean",
      description: "İşaret kaldırılırsa ana sayfada gösterilmez.",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      views: "views",
      media: "image",
      order: "order",
    },
    prepare(selection) {
      const { title, type, views, media, order } = selection;
      const typeLabel = type === "reel" ? "🎥 Reel" : "📷 Post";
      const viewText = views ? ` (${views})` : "";
      return {
        title: `${order ? `#${order} - ` : ""}${title}`,
        subtitle: `${typeLabel}${viewText}`,
        media,
      };
    },
  },
});
