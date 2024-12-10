import Image from "next/image";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function card({ title, categories, logo, alamat, website }) {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <Image
          alt="slide_1"
          // src={`/images/content/profile/Photo.png`}
          // src={"http://localhost:3003/uploads/Nunia Logo.png"}
          src={BASE_URL + logo}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />
      </div>
      <p className="font-bold sm:text-md md:text-xl md:mt-2 text-center">{title}</p>
    </>
  );
}
