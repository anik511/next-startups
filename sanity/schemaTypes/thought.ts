import { defineField, defineType } from "sanity";

export const thought = defineType({
  name: "thought",
  title: "Thought",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: "reviewer",
      type: "reference",
      to: [{ type: "reviewer" }],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "views",
      type: "number",
      
    }),
    defineField({
      name: "reviewedAt",
      type: "datetime",
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
    defineField({
      name: "description",
      type: "markdown",
    }),
    defineField({
      name: "category",
      type: "string",
    }),
    defineField({
      name: "likes",
      type: "number",
    }),
    defineField({
      name: "dislikes",
      type: "number",    
    }),
    defineField({
      name: "rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).required().error("Rating is required"),   
    }),
    defineField({
      name: "comments",
      type: "array",
      of: [{ type: "text" }],
    }),
  ],
})