"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function SwiperComponent1({ sWidth, banners }) {
  const router = useRouter();
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 3000, // 3 seconds
        disableOnInteraction: false,
      }}
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next1",
        prevEl: ".swiper-button-prev1",
        clickable: true,
      }}
      className=""
    >
      {banners.map((e, i) => {
        return (
          <SwiperSlide key={e + i}>
            <div
              onClick={() => {
                router.push(e.link);
              }}
              className={`${
                sWidth > 1023 ? "w-full" : "w-full"
              } aspect-video bg-slate-500 rounded-lg mx-auto relative overflow-hidden cursor-pointer`}
            >
              <Image
                src={e.banner != "" && e.banner ? BASE_URL + e.banner : "/images/content/banner/Home Banner.jpg"}
                alt="illustrasi-1"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        );
      })}
      <div className="mt-7 bg-slate-300">
        <div className="swiper-pagination swiper1"></div>
      </div>
    </Swiper>
  );
}
