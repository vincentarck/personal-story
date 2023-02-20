import React from "react";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import getLocaleDate from "../lib/localeDate";
import ClientSideRoute from "./ClientSideRoute";
type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-blue-200/70 mb-10" />

      <div className="px-0 sm:px-24 md:px-0 lg:px-24 2xl:px-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-12 gap-y-12">
        {posts.map((post) => (
          <ClientSideRoute 
          key={post._id} href={`/post/${post.slug.current}`}>
            <div
              className="relative w-full h-[420px] drop-shadow-xl group-hover:scale-105 transition-transform duration-150 p-4 bg-[#1c1f26] border-[#a8b3cf33] flex flex-col group cursor-pointer rounded-md"
            >
              <div className="flex-[6] px-3 ">
                <div className="flex justify-between align-middle items-center">
                  <Image
                    src={urlFor(post.author.image).url()}
                    width={30}
                    height={35}
                    className="rounded-md"
                    alt="profile"
                  />
                  <div className="bg-white p-2 rounded-md text-black font-bold text-md ">
                    Read Post
                  </div>
                </div>

                <div>
                  <h1 className="text-lg font-bold mt-4">
                    {post.title.length > 105
                      ? `${post.title.slice(0, 105)} ...`
                      : post.title}
                  </h1>
                </div>
              </div>
              <div className="flex-[5]">
                <div className="flex justify-between mb-3">
                  <p className="font-normal text-sm">
                    {getLocaleDate(post._createdAt, "en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex flex-wrap max-w-[250px] gap-2">
                    {post.categories.map((ctgry) => (
                      <p
                        className="py-1 px-3 rounded-full
                   bg-blue-200 text-[#1c1f26] font-bold text-sm"
                      >
                        #{ctgry.title}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="h-full relative overflow-hidden rounded-md">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    className="object-cover object-left hover:scale-105 transition-all ease-in-out lg:object-center"
                    alt={post.author.name}
                    fill
                  />
                </div>
              </div>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}
