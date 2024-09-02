"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { MemberCard } from "@/server/member/card";
import { useQuery } from "@tanstack/react-query";
import { AccordionItem } from "../accordion/accordion-item";

function CardSwiper() {
  const [windowWidth, setWindowWidth] = useState(0);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["member-cards"],
    queryFn: MemberCard,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //   0101 basic
  // 0102 gold
  // 0103 platitum
  // 0123

  return (
    <div className="container relative">
      <div className="slider-controler mb-9">
        <div className="swiper-button-prev slider-arrow">
          <ArrowLeftCircleIcon className="h-6 w-6" />
        </div>
        <div className="swiper-button-next slider-arrow">
          <ArrowRightCircleIcon className="h-6 2-6" />
        </div>
        {/* <div className="swiper-pagination"></div> */}
      </div>

      <Swiper
        spaceBetween={10}
        effect={"fade"}
        grabCursor={true}
        loop={true}
        slidesPerView={windowWidth < 835 ? "1" : windowWidth < 1225 ? "2" : "3"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 10,
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
        {data.data.data.map((e, index) => {
          const expiredDate = new Date(e.tgl_expired);
          let src = "b.png";
          let benefit = "Basic"
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
            <SwiperSlide key={e.no_msn} className="bg-white rounded-lg">
              <div
                style={{ width: "100%", position: "relative" }}
                className=" left-0 right-0 mx-auto min-w-[355px] md:min-w-[400px] max-w-[500px]"
              >
                <Image
                  alt="slide_1"
                  src={`/images/master_card/${src}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="absolute right-6 xl:right-9 bottom-6 xl:bottom-9 text-white text-right xl:text-xl">
                  <p className="leading-5 xl:leading-8 font-sans font-bold">{e.nm_customer}</p>
                  <p
                    className="leading-5 xl:leading-6 font-sans xl:text-2xl font-bold"
                    dangerouslySetInnerHTML={{ __html: e.no_kartu.split(" ").join("&nbsp;") }}
                  ></p>
                  <p className="leading-5 xl:leading-6 font-sans font-bold uppercase">{e.no_msn}</p>
                  <p className="leading-5 xl:leading-6 font-sans">
                    Exp.{" "}
                    {String(expiredDate.getMonth() + 1).padStart(2, "0") +
                      "/" +
                      String(expiredDate.getFullYear()).slice(2, 4)}
                  </p>
                </div>
              </div>
              <div className="pl-4 -mt-2">
                <AccordionItem
                  key={index}
                  question={"Benefit " }
                  answer={"ini benefit yang kita punya " + benefit}
                  isOpen={activeIndex === index}
                  onClick={() => handleItemClick(index)}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default CardSwiper;
