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

export default function SwiperComponent1({ sWidth, banners }) {
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
            <div className={`${sWidth > 1023 ? "w-full" : "w-full"} h-auto mx-auto`}>
              <Image
                src={"/images/content/banner/" + e}
                alt="illustrasi-1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
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
