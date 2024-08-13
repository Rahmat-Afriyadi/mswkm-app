import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import dynamic from "next/dynamic";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";

// import slide_image_1 from '/images/img_1.jpg';
// import slide_image_2 from '/images/img_2.jpg';
// import slide_image_3 from '/images/img_3.jpg';
// import slide_image_4 from '/images/img_4.jpg';
// import slide_image_5 from '/images/img_5.jpg';

const slide_image_1 = dynamic(() => import("../../../../public/images/img_1.jpg"));

function App() {
  return (
    <div className="container">
      <h1 className="heading" style={{ fontStretch: "ultra-expanded" }}>
        HVC Anda
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        slidesPerView={"3"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        // pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <div style={{ width: "100%", position: "relative" }} className=" min-w-[355px] max-w-[500px]">
            <Image
              alt="slide_1"
              src="/images/master_card/b.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute right-6 xl:right-9 bottom-6 xl:bottom-9 text-white text-right xl:text-xl">
              <p className="leading-5 xl:leading-8 font-sans font-bold">Wahyu Hidayat</p>
              <p className="leading-5 xl:leading-6 font-sans xl:text-2xl font-bold">
                0101 &nbsp;0101 &nbsp;0101 &nbsp;0101
              </p>
              <p className="leading-5 xl:leading-6 font-sans font-bold uppercase">jk12341sa</p>
              <p className="leading-5 xl:leading-6 font-sans">Exp. 02/17</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ width: "100%", position: "relative" }} className=" min-w-[355px] max-w-[500px]">
            <Image
              alt="slide_1"
              src="/images/master_card/b.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute right-6 xl:right-9 bottom-6 xl:bottom-9 text-white text-right xl:text-xl">
              <p className="leading-5 xl:leading-8 font-sans font-bold">Wahyu Hidayat</p>
              <p className="leading-5 xl:leading-6 font-sans xl:text-2xl font-bold">
                0101 &nbsp;0101 &nbsp;0101 &nbsp;0101
              </p>
              <p className="leading-5 xl:leading-6 font-sans font-bold uppercase">jk12341sa</p>
              <p className="leading-5 xl:leading-6 font-sans">Exp. 02/17</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ width: "100%", position: "relative" }} className=" min-w-[355px] max-w-[500px]">
            <Image
              alt="slide_1"
              src="/images/master_card/b.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute right-6 xl:right-9 bottom-6 xl:bottom-9 text-white text-right xl:text-xl">
              <p className="leading-5 xl:leading-8 font-sans font-bold">Wahyu Hidayat</p>
              <p className="leading-5 xl:leading-6 font-sans xl:text-2xl font-bold">
                0101 &nbsp;0101 &nbsp;0101 &nbsp;0101
              </p>
              <p className="leading-5 xl:leading-6 font-sans font-bold uppercase">jk12341sa</p>
              <p className="leading-5 xl:leading-6 font-sans">Exp. 02/17</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ width: "100%", position: "relative" }} className=" min-w-[355px] max-w-[500px]">
            <Image
              alt="slide_1"
              src="/images/master_card/b.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute right-6 xl:right-9 bottom-6 xl:bottom-9 text-white text-right xl:text-xl">
              <p className="leading-5 xl:leading-8 font-sans font-bold">Wahyu Hidayat</p>
              <p className="leading-5 xl:leading-6 font-sans xl:text-2xl font-bold">
                0101 &nbsp;0101 &nbsp;0101 &nbsp;0101
              </p>
              <p className="leading-5 xl:leading-6 font-sans font-bold uppercase">jk12341sa</p>
              <p className="leading-5 xl:leading-6 font-sans">Exp. 02/17</p>
            </div>
          </div>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ArrowLeftCircleIcon className="h-6 w-6" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ArrowRightCircleIcon className="h-6 2-6" />
          </div>
          {/* <div className="swiper-pagination"></div> */}
        </div>
      </Swiper>

    </div>
  );
}

export default App;
