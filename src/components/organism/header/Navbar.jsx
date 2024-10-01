import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className=" h-6 w-full">
      <div className="grid grid-cols-12 gap-x-1">
        <div className="col-span-3  flex justify-center">
          <a href="/" className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer">
            <Image
              src={`/images/content/header/icon${pathname == "/" ? " active" : ""}.png`}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
        <div className="col-span-3  flex justify-center">
          <a href="/profile" className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer ">
            <Image
              src={`/images/content/header/icon 2${pathname == "/profile" ? " active" : ""}.png`}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
        <div className="col-span-3  flex justify-center">
          <a href="/card" className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer ">
            <Image
              src={`/images/content/header/icon 3${pathname == "/card" ? " active" : ""}.png`}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
        <div className="col-span-3  flex justify-center">
          <a href="/faq" className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer ">
            <Image
              src={`/images/content/header/icon 4${pathname == "/faq" ? " active" : ""}.png`}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
