import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Kategori İsmi",
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
      name: "icon",
      title: "İkon",
      description: "Materyal ikonu adı veya emoji (ör. spa, eco)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
    }),
  ],
});
