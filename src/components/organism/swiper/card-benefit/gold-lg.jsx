"use client";

import Image from "next/image";

export default function BenefitGoldLg() {
  return (
    <div className="w-full justify-center flex">
      <div className="w-full rounded-2xl border-2 h-auto border-white  grid grid-cols-12 gap-x-3 px-3 bg-slate-800 bg-opacity-50 py-5">
        <div className="col-span-12 ">
          <p className="font-bold text-white italic text-lg">Benefit Honda VIP Card Gold</p>
          <div className="w-8/12 bg-white h-[2px] rounded-lg mt-2 mx-auto"></div>
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/gold-lg/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            className="mt-7"
            src={"/images/content/member/benefit/gold-lg/Benefit 4.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/gold-lg/Benefit 2.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            className="mt-7"
            src={"/images/content/member/benefit/gold-lg/Benefit 5.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/gold-lg/Benefit 3.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            className="mt-7"
            src={"/images/content/member/benefit/gold-lg/Benefit 6.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-3 mt-5">
          <Image
            src={"/images/content/member/benefit/gold-lg/Benefit 7.png"}
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
