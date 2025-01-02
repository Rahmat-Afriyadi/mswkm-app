import Image from "next/image";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function card({ title, categories, logo, alamat, website }) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center cursor-pointer max-w-52 aspect-square">
        <Image
          alt="slide_1"
          src={BASE_URL + logo}
          width={0}
          height={0}
          sizes="100vh"
          style={{ width: "100%" }}
          blurDataURL="/images/content/profile/Photo.png"
          priority={true}
        />
      </div>
      <p className="font-bold text-sm sm:text-md md:text-xl md:mt-2 text-center">{title}</p>
    </>
  );
}
