"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export default function SwiperComponent({ sWidth, banners }) {
  if (isLoading) {
    return (
      <div className="w-full ">
        <div className="w-full flex flex-col items-center bg-cover bg-center h-screen justify-center">
          <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5 }} />
        </div>
      </div>
    );
  }
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      loop={true}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      modules={[Navigation, Pagination]}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
      className="bg-slate-700"
    >
      {banners.map((e, i) => {
        const expiredDate = new Date(e.tgl_expired);
        let src = "b.png";
        let benefit = "Basic";
        if (e.no_kartu.slice(2, 4) == "02") {
          src = "g.png";
          benefit = "Benefit Gold";
        } else if (e.no_kartu.slice(2, 4) == "03") {
          src = "p.png";
          benefit = "Benefit Platinum";
        } else if (e.no_kartu.slice(2, 4) == "23") {
          src = "pp.png";
          benefit = "Benefit Platinum Plus";
        }
        return (
          <SwiperSlide key={e + i}>
            <div className={`${sWidth > 1023 ? "w-11/12" : "w-full"} h-auto mx-auto`}>
              <Image
                src={`/images/master_card/${src}`}
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
