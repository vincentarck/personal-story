import { groq } from "next-sanity";
import React from "react";
import { client } from "../../../../lib/sanity.client";
import Image from "next/image";
import urlFor from "../../../../lib/urlFor";
import getLocaleDate from "../../../../lib/localeDate";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: Props) {
  const query = groq`
    *[_type == 'post' && slug.current == $slug][0]{
        ...,
        author->,
        categories[]->
    }
    `;

  const post: Post = await client.fetch(query, { slug });
  const { _createdAt, author, categories, description, title, mainImage } = post;
  return (
    <article>
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 relative h-80 sm:h-96 lg:h-[500px] xl:h-[600px] mx-auto">
        <Image
          src={urlFor(mainImage).url()}
          className="object-cover object-center mx-auto"
          alt="profile"
          fill
        />

        <div className="absolute w-full right-[0px] bottom-[0px] bg-[#0e1217]/50 p-5 flex justify-between">
          <div className="max-w-[400px] xl:max-w-[550px]">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl">{title}</h1>
            <p className="font-bold text-yellow-50 text-sm">
              {getLocaleDate(_createdAt, "en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="hidden lg:flex gap-3 items-center">
            {categories.map(ctgry => <p className="py-2 px-4 rounded-lg bg-blue-300 text-sm text-black font-medium">#{ctgry.title}</p>)}
          </div>
        </div>
      </div>
    </article>
  );
}
