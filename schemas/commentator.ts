import { defineField, defineType } from "sanity";

export default defineType({
  name: "commentator",
  title: "Commentator",
  type: "document",
  fields: [
    defineField({
      name: "personality",
      title: "Personality",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
