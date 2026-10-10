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
          { title: "Fiziksel", value: "fiziksel" },
          { title: "Online", value: "online" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Fiyat (₺)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capacity",
      title: "Toplam Kontenjan",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "spotsLeft",
      title: "Kalan Yer",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Görsel",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
