import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex items-center py-5 font-bold justify-between">
      <div
        className="space-x-2 flex items-center
      "
      >
        <Link href={"/"}>
          <Image
            src="https://w1.pngwing.com/pngs/680/95/png-transparent-yellow-circle-mask-of-tutankhamun-ancient-egypt-pharaoh-logo-smile-symbol.png"
            width={50}
            height={50}
            alt="logo"
            className="rounded-full"
          />
        </Link>
        <h1 className="hidden sm:block">The Ancienct VIN</h1>
      </div>
      <div
        className="bg-gray-800 flex items-ce
       justify-center px-5 py-3 gap-3 rounded-full "
      >
        <Image
          src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
          width={30}
          height={30}
          alt="logo"
          className="rounded-sm"
        />
        <Link
          className="text-sm md:text-base text-blue-400 flex items-center justify-center text-center"
          href={"https://www.linkedin.com/in/vincent-laurensius-h-3413261a8/"}
        >
          Connect with me
        </Link>
      </div>
    </div>
  );
};
