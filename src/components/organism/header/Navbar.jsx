import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import iconActive from "../../../../public/images/content/header/Icon active.png";
import icon from "../../../../public/images/content/header/Icon.png";
import icon2Active from "../../../../public/images/content/header/Icon 2 active.png";
import icon2 from "../../../../public/images/content/header/Icon 2.png";
import icon3Active from "../../../../public/images/content/header/Icon 3 active.png";
import icon3 from "../../../../public/images/content/header/Icon 3.png";
import icon4Active from "../../../../public/images/content/header/Icon 4 active.png";
import icon4 from "../../../../public/images/content/header/Icon 4.png";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className=" h-6 w-full">
      <div className="grid grid-cols-12 gap-x-1">
        <div className="col-span-3  flex justify-center">
          <a href="/" className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer">
            <Image
              src={pathname == "/" ? iconActive : icon}
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
              src={pathname == "/profile" ? icon2Active : icon2}
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
              src={pathname == "/card" ? icon3Active : icon3}
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
              src={pathname == "/faq" ? icon4Active : icon4}
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