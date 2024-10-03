"use client";

import { useSession } from "next-auth/react";
import Accordion from "@/components/accordion/accordion";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full bg-[#54565a]">
        <div className="w-full flex flex-col items-center">
          <div className="w-9/12 h-3 mt-2">
            <div className="w-full text-center text-white font-bold text-xl">FAQ</div>
          </div>
          <br />
          <div className="w-10/12 bg-white h-[2px] rounded-lg"></div>
          <br />
        </div>
        <div className="w-full">
          <br />
          <br />
          <div className="w-full flex items-center justify-center">
            <Accordion />
          </div>
          <br />
          <br />
        </div>
        <div className="w-full h-auto">
          <Image
            src={"/images/content/footer/Footer.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
}