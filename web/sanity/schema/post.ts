import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Yazısı",
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
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternatif Metin (Alt Text)",
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Fotoğraf Galerisi",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: { type: "category" },
    }),
    defineField({
      name: "tags",
      title: "Etiketler",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "string",
      initialValue: "The Luma Ekibi",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet (SEO için kısa açıklama)",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" }
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Başlığı",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Açıklaması",
      type: "text",
    }),
  ],
});
