import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const reviewer = defineType({
  name: "reviewer",
  title: "Reviewer",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    defineField({
      name: "lastName",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().error("Email is required"),
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
})