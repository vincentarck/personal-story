import React from "react";
import Image from "next/image";
import urlFor from "../lib/urlFor";
import getLocaleDate from "../lib/localeDate";
type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  console.log(posts);
  return (
    <div>
      <hr className="border-blue-200/70 mb-10" />

      <div className="px-0 sm:px-24 md:px-0 lg:px-24 2xl:px-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative w-full min-h-[360px] drop-shadow-xl group-hover:scale-105 transition-transform duration-150 p-4 bg-[#1c1f26] border-[#a8b3cf33] flex flex-col group cursor-pointer rounded-md"
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
                  {post.title.length > 75
                    ? `${post.title.slice(0, 75)} ...`
                    : post.title}
                </h1>
              </div>
            </div>
            <div className="flex-[5]">
              <p className="font-normal text-sm">
                {getLocaleDate(
                  post._createdAt,
                  "en-US",
                  { day: "numeric", month: "short", year: "numeric" }
                  
                )}
              </p>
              <div className="h-[85%] relative">
                <Image
                  src={urlFor(post.mainImage).url()}
                  className="object-cover object-left rounded-md lg:object-center"
                  alt={post.author.name}
                  fill
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
