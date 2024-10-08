"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { MemberCard } from "@/server/member/card";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import BenefitBasic from "./card-benefit/basic";
import BenefitGold from "./card-benefit/gold";
import BenefitPlatinum from "./card-benefit/platinum";
import BenefitPlatinumPlus from "./card-benefit/platinum-plus";
import BenefitBasicLg from "./card-benefit/basic-lg";
import BenefitGoldLg from "./card-benefit/gold-lg";
import BenefitPlatinumLg from "./card-benefit/platinum-lg";
import BenefitPlatinumPlusLg from "./card-benefit/platinum-plus-lg";

function CardSwiperLg() {
  const swiperRef = useRef(null);

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Set active index
    }
  };

  //   0101 basic
  // 0102 gold
  // 0103 platitum
  // 0123

  return (
    <>
      {/* <div className="w-full">
        <div className="slider-controler mt-11 sm:mt-0">
          <div className="swiper-button-prev slider-arrow">
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ChevronRightIcon className="h-6 2-6 text-white" />
          </div>
        </div>
      </div> */}
      <div className="container">
        <Swiper
          // spaceBetween={windowWidth < 835 ? 6 : windowWidth < 1225 ? 8 : 10}
          // onSlideChange={(e) => goToSlide(e.activeIndex)}
          spaceBetween={2}
          effect={"fade"}
          grabCursor={true}
          loop={true}
          // slidesPerView={windowWidth < 835 ? "1" : windowWidth < 1225 ? "2" : "3"}
          slidesPerView={"1"}
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
          className="relative mt-5"
        >
          {data.data.data.map((e, index) => {
            const expiredDate = new Date(e.tgl_expired);
            let src = "b.png";
            let benefit = "Basic";
            let benefitDesc = "Basic";
            if (e.no_kartu.slice(2, 4) == "02") {
              src = "g.png";
              benefit = "Benefit Gold";
              benefitDesc = "Gold";
            } else if (e.no_kartu.slice(2, 4) == "03") {
              src = "p.png";
              benefit = "Benefit Platinum";
              benefitDesc = "Platinum";
            } else if (e.no_kartu.slice(2, 4) == "23") {
              src = "pp.png";
              benefit = "Benefit Platinum Plus";
              benefitDesc = "Platinum Plus";
            }

            return (
              <SwiperSlide key={e.no_msn} className="rounded-lg">
                <div className="w-full grid grid-cols-12">
                  <div className="col-span-3 relative">
                    <div
                      style={{ width: "100%", position: "relative" }}
                      className=" max-w-[500px] left-0 right-0 mx-auto"
                    >
                      <Image
                        alt="slide_1"
                        src={`/images/master_card/${src}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                      <div className="absolute right-6 xl:right-9 bottom-4 xl:bottom-6 text-white text-right text-[12px] xl:text-[16px]">
                        <p className="leading-4 xl:leading-5 font-sans font-bold">{e.nm_customer}</p>
                        <p
                          className="leading-4 xl:leading-5 font-sans xl:text-[16px] font-bold"
                          dangerouslySetInnerHTML={{ __html: e.no_kartu.split(" ").join("&nbsp;") }}
                        ></p>
                        <p className="leading-4 xl:leading-5 font-sans font-bold uppercase">{e.no_msn}</p>
                        <p className="leading-4 xl:leading-5 font-sans">
                          Exp.{" "}
                          {String(expiredDate.getMonth() + 1).padStart(2, "0") +
                            "/" +
                            String(expiredDate.getFullYear()).slice(2, 4)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-9">
                    {benefitDesc == "Basic" && <BenefitBasicLg />}
                    {benefitDesc == "Gold" && <BenefitGoldLg />}
                    {benefitDesc == "Platinum" && <BenefitPlatinumLg />}
                    {benefitDesc == "Platinum Plus" && <BenefitPlatinumPlusLg />}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ini deskripsi */}
      {/* <Swiper
        ref={swiperRef}
        spaceBetween={2}
        effect={"fade"}
        grabCursor={true}
        loop={true}
        slidesPerView={"1"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 10,
          modifier: 2.5,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="relative"
      >
        {data.data.data.map((e, index) => {
          let benefit = "Basic";
          if (e.no_kartu.slice(2, 4) == "02") {
            benefit = "Gold";
          } else if (e.no_kartu.slice(2, 4) == "03") {
            benefit = "Platinum";
          } else if (e.no_kartu.slice(2, 4) == "23") {
            benefit = "Platinum Plus";
          }
          return (
            <SwiperSlide key={e.no_msn} className="-mt-3">
              {benefit == "Basic" && <BenefitBasic />}
              {benefit == "Gold" && <BenefitGold />}
              {benefit == "Platinum" && <BenefitPlatinum />}
              {benefit == "Platinum Plus" && <BenefitPlatinumPlus />}
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </>
  );
}

export default CardSwiperLg;
