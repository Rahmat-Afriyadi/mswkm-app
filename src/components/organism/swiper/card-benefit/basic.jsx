"use client";

import Image from "next/image";

export default function BenefitBasic() {
  return (
    <div className="w-full justify-center flex">
      <div className="w-10/12 rounded-2xl border-2 h-auto border-white mt-6 grid grid-cols-12 gap-x-3 px-3 bg-slate-800 bg-opacity-50">
        <div className="col-span-12">
          <p className="font-bold text-white italic text-lg">Benefit Honda VIP Card Basic</p>
          <div className="w-full bg-white h-[2px] rounded-lg"></div>
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 1.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 2.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 3.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 4.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 5.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-6 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 6.png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="col-span-12 my-2">
          <Image
            src={"/images/content/member/benefit/basic/Benefit 7.png"}
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
