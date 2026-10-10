import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ürün İsmi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Ürün Galerisi",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "details",
      title: "Detaylı Açıklama",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      title: "Özellikler (Maddeler halinde)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "instructions",
      title: "Kullanım Talimatları",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "trendyolUrl",
      title: "Trendyol Satın Alma Linki",
      type: "url",
    }),
    defineField({
      name: "hepsiburadaUrl",
      title: "Hepsiburada Satın Alma Linki",
      type: "url",
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
  ],
});
