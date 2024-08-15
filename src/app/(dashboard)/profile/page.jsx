"use client";

import CardSwiper from "@/components/organism/swiper/card-swiper";
import PageFrame from "./page-frame";
import { useSession } from "next-auth/react";

export default function Page() {
  const {data:session} = useSession()

  return (
  <>
    
  <div className="w-full h-[320px] md:h-[450px] bg-yellow-400 flex justify-center items-center">
    <div className=" w-10/12 xl:w-1/2 h-72 md:h-96 shadow-lg rounded-lg grid grid-cols-12 relative">
        <div className="absolute w-11/12 h-60 md:h-72 z-10 rounded-md left-0 right-0 top-0 bottom-0 m-auto grid grid-cols-12">
          <div className="col-span-5 bg-green-300">

          </div>
          <div className="col-span-7 p-3">
              <p className="text-2xl font-bold text-center">{session?.user?.name}</p>
          </div>
        </div>
       <div className="col-span-3 bg-yellow-300 h-full rounded-l-md">
       </div>
       <div className="col-span-9 h-full bg-slate-50 rounded-r-md">
          <div className="w-full  flex gap-x-10  justify-end py-2 px-10">
            <a className="text-[14px] font-semibold" href="/">Home</a>
            <a className="text-[14px] font-semibold" href="/profile/card">Card</a>
            <a className="text-[14px] font-semibold" href="">Keamanan</a>
          </div>
       </div>
    </div>
  </div>
    <h1 className="heading" style={{ fontStretch: "ultra-expanded" }}>
      HVC Anda
    </h1>
    <PageFrame/>
    <CardSwiper/>
  </>
);
}
