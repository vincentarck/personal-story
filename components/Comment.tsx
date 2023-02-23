"use client";
import React, { useEffect, useState } from "react";
import urlFor from "../lib/urlFor";
import getLocaleDate from "../lib/localeDate";
import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "../lib/sanity.client";

type Props = {
  post: any;
  comments: Comment[];
  commentators: Commentator[];
};

const query = groq`
*[_type == 'post' && slug.current == $slug][0]{
    _id
}
`;
export const revalidate = 5
export const Comments = ({ comments, commentators }: any) => {
  
  const [visible, setVisible] = useState(false);

  const [bodyComment, setBodyComment] = useState({
    avatar: {
      img: "https://cdn.shopify.com/s/files/1/1140/8354/files/Aang_the_last_airbender_480x480.jpg?v=1661733149",
      placeholder: "Pilih profile kalian",
      ref: "",
    },
    desc: "",
    _id:""
  });
  useEffect(() => {
    (async () => {
      const slug = window.location.pathname.split("/post/")[1];
      const post: object = await client.fetch(query, { slug });
      setBodyComment(prev => ({...prev, ...post}))
    })();
  }, []);

  const [showErrorMsg, setShowErrorMsg] = useState("");
  const handlePostComment = () => {
    const { desc, avatar } = bodyComment;
    if (!desc.trim().length)
      return setShowErrorMsg("Yuk isi pikiran anda dulu");
    if (avatar.placeholder === "Select an option")
      return setShowErrorMsg("Masukin karakter pilihan yuk");
    const mutations = {
      mutations: [
        {
          create: {
            _type: "comment",
            blog: {
              _type: "reference",
              _ref: bodyComment._id,
            },
            person: {
              _type: "reference",
              _ref: avatar.ref,
            },
            description: desc,
          },
        },
      ],
    };

    fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY}`,
        },
        body: JSON.stringify(mutations),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setShowErrorMsg("");
        setBodyComment({
          desc: "",
          avatar: {
            img: "https://cdn.shopify.com/s/files/1/1140/8354/files/Aang_the_last_airbender_480x480.jpg?v=1661733149",
            placeholder: "Select an option",
            ref: "",
          },
          _id:""
        });
      })
      .catch((error) => console.error(error));

    window.location.reload();
  };

  return (
    <>
      <hr className="border-blue-200/70 my-10" />
      <div className="text-[#cccccc]">
        <span className="text-lg font-bold">{comments.length} Comments</span>
        <div className="w-full sm:w-4/5 md:w-2/4 xl:w-2/5">
          <div className="mb-10 w-full flex flex-col">
            <div className="relative mb-6 flex gap-4 items-center mt-5 h-12">
              {!visible && (
                <Image
                  src={bodyComment.avatar.img}
                  alt="img"
                  width={50}
                  height={50}
                  className="rounded-full"
                  onClick={() => setVisible((prev) => !prev)}
                />
              )}
              <p className=" text-sm font-medium text-gray-100">
                {bodyComment.avatar.placeholder}
              </p>
              {visible && (
                <div
                  id="countries"
                  className="flex flex-col gap-6 absolute top-[100%] z-10 bg-gray-100 p-5 rounded-md"
                  onClick={() => setVisible((prev) => !prev)}
                >
                  {commentators.map((commenter: Commentator) => (
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() =>
                        setBodyComment((prev) => ({
                          ...prev,
                          avatar: {
                            img: urlFor(commenter.profileImage).url(),
                            placeholder: commenter.personality,
                            ref: commenter._id,
                          },
                        }))
                      }
                      key={commenter._id}
                    >
                      <Image
                        src={urlFor(commenter.profileImage).url()}
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt="profile"
                      />
                      <p className="text-[#333333] font-normal text-sm hover:text-[#729736]">
                        {commenter.personality}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                id="floating_filled"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={(e) =>
                  setBodyComment((prev) => ({ ...prev, desc: e.target.value }))
                }
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-[5] origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Isi hati kalian
              </label>
            </div>
            <div className="flex gap-5 self-end items-end">
              {showErrorMsg && (
                <p className="text-red-300 font-semibold text-sm">
                  {showErrorMsg}
                </p>
              )}
              <button
                className="py-2 px-8 font-semibold text-white bg-blue-300 mt-5 max-w-[100px] "
                onClick={handlePostComment}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
        {comments?.map((comment: Comment) => (
          <div className="mx-5 mb-5" key={comment._id}>
            <div className="flex gap-3 items-start">
              <Image
                src={urlFor(comment.person.profileImage).url()}
                width={45}
                height={45}
                className="rounded-full"
                alt="profile"
              />
              <h2 className="font-bold text-md text-white">
                <div>
                  {comment.person.personality}
                  <span className="ml-4 text-sm text text-[#cccccc]">
                    {getLocaleDate(comment._createdAt, "en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="pt-2 text-[#cccccc] font-normal">
                  {comment.description}
                </p>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
