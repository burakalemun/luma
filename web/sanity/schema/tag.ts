import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "Etiket",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Etiket İsmi",
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
  ],
});
