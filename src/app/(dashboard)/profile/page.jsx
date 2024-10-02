"use client";

import CardSwiper from "@/components/organism/swiper/card-swiper";
import PageFrame from "./page-frame";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CalendarDateRangeIcon, HomeIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full bg-[#54565a]">
        <div className="w-full flex flex-col items-center">
          <div className="w-9/12 h-3 mt-2">
            <div className="w-full text-center text-white font-bold text-xl">Profile</div>
          </div>
          <br />
          <div className="w-10/12 bg-white h-[2px] rounded-lg"></div>
          <br />
        </div>
      </div>

      {/* <div className="w-full h-[320px] md:h-[450px] bg-yellow-400 flex justify-center items-center">
        <div className=" w-10/12 xl:w-1/2 h-72 md:h-96 shadow-lg rounded-lg grid grid-cols-12 relative">
          <div className="absolute w-11/12 z-10 rounded-md left-0 right-0 top-0 bottom-0 m-auto grid grid-cols-12 items-center">
            <div className="col-span-4 h-60 bg-green-300"></div>
            <div className="col-span-8 bg-red-300">
              <p className="text-2xl font-bold text-left">{session?.user?.name}</p>

              <div className="flex mb-3">
                <CalendarDateRangeIcon className="h-6 w-6 mr-4" />
                <p className="text-lg text-left"> 02 Maret 2003</p>
              </div>
              <div className="flex mb-3">
                <PhoneIcon className="h-6 w-6 mr-4" />
                <p className="text-lg text-left">082124744961</p>
              </div>
              <div className="flex mb-3 w-full">
                <div className="h-6 w-6 mr-4">
                  <PhoneIcon className="h-6 w-6 " />
                </div>
                <p className="text-lg text-left whitespace-normal leading-6">
                  whitespace-normalwhitespace-normalwhitespace-normalwhitespace-normalwhitespace-normal
                </p>
              </div>
            </div>
          </div>
          <div className="absolute w-6/12 h-60 md:h-72 z-10 rounded-md left-0 top-0 bottom-0 my-auto grid grid-cols-12">
            <div className="col-span-12 px-3">
              <p className="text-2xl font-bold text-left">{session?.user?.name}</p>
              <p className="text-lg text-left">02 Maret 2003</p>
            </div>
          </div>
          <div className="col-span-3 bg-yellow-300 h-full rounded-l-md"></div>
          <div className="col-span-9 h-full bg-slate-50 rounded-r-md">
            <div className="w-full  flex gap-x-10  justify-end py-2 px-10">
              <a className="text-[14px] font-semibold" href="/">
                Home
              </a>
              <a className="text-[14px] font-semibold" href="/profile/card">
                Card
              </a>
              <a className="text-[14px] font-semibold" href="">
                Keamanan
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
