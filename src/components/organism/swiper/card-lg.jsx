"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { MemberCard } from "@/server/member/card";
import { useQuery } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { ClipLoader } from "react-spinners";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

function CardLg() {
  const swiperRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(0);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["member-cards"],
    queryFn: MemberCard,
  });

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
    return (
      <div className="w-full bg-[#54565a] ">
        <div
          className="w-full flex flex-col items-center bg-cover bg-center h-52 justify-center"
          style={{ backgroundImage: `url('${BASE_URL}/uploads/BG.PNG')` }}
        >
          <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5, marginTop: 60 }} />
        </div>
      </div>
    );
  }
  if (isError) {
    if (error.message == "Unauthorized") {
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
    }
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
    <div className="container opacity-0">
      <div className="relative mt-5">
        <div className="w-full flex justify-center">
          <div className="w-11/12 grid grid-cols-12">
            <div className="col-span-5 relative">
              <div style={{ width: "90%", position: "relative" }} className=" max-w-[500px] -left-5 right-0 mx-auto">
                <Image
                  alt="slide_1"
                  src={`/images/master_card/b.png`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLg;
