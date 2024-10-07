"use client";

import Image from "next/image";

export default function BenefitBasicLg() {
  return (
    <div className="w-full justify-center flex">
      <div className="w-11/12 rounded-2xl border-2 h-auto border-white  grid grid-cols-12 gap-x-3 md:gap-x-2 px-3 bg-slate-800 bg-opacity-50">
        <div className="col-span-12 mt-2">
          <p className="font-bold text-white italic text-lg">Benefit Honda VIP Card Basic</p>
          <div className="w-8/12 bg-white h-[2px] rounded-lg mt-2 mx-auto"></div>
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            className="mt-7"
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
