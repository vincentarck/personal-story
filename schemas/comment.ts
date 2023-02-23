import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "blog",
      title: "Blog",
      type: "reference",
      description: "Reference the blog the comment is associate to",
      to: [{ type: "post" }],
    }),
    defineField({
        name: "person",
        title: "Person",
        type: "reference",
        to: [{ type: "commentator" }],
      }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "popularity",
      title: "Post Popularity",
      type: "object",
      fields: [
        {
          title: "likesPost",
          name: "Likes",
          type: "number",
        },
        {
          title: "dislikesPost",
          name: "Dislikes",
          type: "number",
        },
      ],
    }),
  ],
});
