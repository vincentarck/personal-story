import React from "react";
import Image from "next/image";
import urlFor from "../lib/urlFor";
type Props = {
  posts: Post[];
};

export default function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-blue-200/70 mb-10" />

      <div>
        {posts.map((post) => (
          <div key={post._id} className="flex flex-col group cursor-pointer">
            <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-150">
              <Image
                src={urlFor(post.mainImage).url()}
                className="object-cover object-left lg:object-center"
                alt={post.author.name}
                fill
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
