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

export default function SwiperComponent({ sWidth, banners }) {
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </div>
        <div className="swiper-button-next slider-arrow">
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
}
