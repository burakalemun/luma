import { defineField, defineType } from "sanity";

export default defineType({
  name: "workshop",
  title: "Workshop / Atölye",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Tarih ve Saat",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateStr",
      title: "Görünen Tarih (Örn: 15 Kasım 2026)",
      type: "string",
      description: "Tarih metni olarak doğrudan göstermek isterseniz",
    }),
    defineField({
      name: "time",
      title: "Saat Aralığı (Örn: 14:00 - 17:00)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Konum (Mekan veya Zoom Linki)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Atölye Tipi",
      type: "string",
      options: {
        list: [
          { title: "Fiziksel", value: "Fiziksel" },
          { title: "Online", value: "Online" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Fiyat (₺)",
      type: "number",
    }),
    defineField({
      name: "priceStr",
      title: "Görünen Fiyat Metni (Örn: ₺1.250)",
      type: "string",
    }),
    defineField({
      name: "capacity",
      title: "Toplam Kontenjan",
      type: "number",
    }),
    defineField({
      name: "spotsLeft",
      title: "Kalan Yer",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Kapak Görseli (Dosya Yükleme)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageUrl",
      title: "Harici Görsel Linki (Opsiyonel / CSV için)",
      type: "url",
      description: "Dosya yüklemek yerine doğrudan Unsplash veya CDN linki yapıştırmak isterseniz",
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Detaylı İçerik",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title,
        subtitle: date ? new Date(date).toLocaleString("tr-TR") : "Tarih Yok",
        media,
      };
    },
  },
});
