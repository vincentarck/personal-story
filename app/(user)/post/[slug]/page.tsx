// "use client"
import { groq } from "next-sanity";
// import React, {useState} from "react";
import { client } from "../../../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../../../lib/urlFor";
import getLocaleDate from "../../../../lib/localeDate";
import { PortableText } from "@portabletext/react";
import { RichTextComponent } from "../../../../components/RichTextComponent";
import { Comments } from "../../../../components/Comment";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 5; // Help to update all resources with static generated pages

const commentsQuery = groq`
    *[_type == 'comment' && references(*[_type == 'post' && _id == $postId]._id)]{
        ...,
        person ->
    } | order(_createdAt desc)
    `;
const avatarCommentsQuery = groq`
    *[_type == 'commentator']{
        ...,
    }
    `;

const query = groq`
*[_type == 'post' && slug.current == $slug][0]{
    ...,
    author->,
    categories[]->
}
`;
export async function generateStaticParams() {
  const query = groq`
  *[_type == 'post']{
    slug
  }
  `;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

export default async function Page({ params: { slug } }: Props) {
 
  const post: Post = await client.fetch(query, { slug });

  const comments: Comment[] = await client.fetch(commentsQuery, {
    postId: post._id,
  });

  const commentators: Commentator[] = await client.fetch(avatarCommentsQuery);

  return (
    <article>
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 relative h-80 sm:h-96 lg:h-[500px] xl:h-[600px] mx-auto">
        <Image
          src={urlFor(post.mainImage).url()}
          className="object-cover object-center mx-auto"
          alt="profile"
          fill
        />

        <div className="absolute w-full right-[0px] bottom-[0px] bg-[#0e1217]/50 p-5 flex justify-between">
          <div className="max-w-[400px] xl:max-w-[550px]">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
              {post.title}
            </h1>
            <p className="font-bold text-yellow-50 text-sm">
              {getLocaleDate(post._createdAt, "en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="hidden lg:flex gap-3 items-center">
            {post.categories.map((ctgry) => (
              <p className="py-2 px-4 rounded-lg bg-blue-300 text-sm text-black font-medium">
                #{ctgry.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      <section
        className="md:px-20 py-12 text-[#e5e7eb]
      "
      >
        <PortableText value={post.body} components={RichTextComponent} />
      </section>

      <Comments comments={comments} commentators={commentators}/>
    </article>
  );
}
