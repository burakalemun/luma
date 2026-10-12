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
      name: "imageUrl",
      title: "Kapak Görseli Linki (Harici / CSV)",
      type: "url",
      description: "Dosya yüklemek yerine doğrudan Unsplash veya CDN görsel bağlantısı",
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
      name: "categoryName",
      title: "Kategori Adı (CSV / Düz Metin)",
      type: "string",
      description: "Doğrudan kategori adı yazmak isterseniz (örn: Doğal Yaşam & Sağlık)",
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
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "content",
      title: "Düz Metin İçerik (CSV / Hızlı Giriş)",
      type: "text",
      rows: 6,
      description: "Zengin metin yerine doğrudan uzun metin yapıştırmak isterseniz",
    }),
    defineField({
      name: "faqs",
      title: "Sıkça Sorulan Sorular (SSS)",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Soru & Cevap",
          fields: [
            { name: "q", type: "string", title: "Soru" },
            { name: "a", type: "text", title: "Cevap" },
          ],
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Zengin İçerik (Editör)",
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
