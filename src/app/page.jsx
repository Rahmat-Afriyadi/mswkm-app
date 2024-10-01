"use client";

import Image from "next/image";
import Header from "@/components/organism/header/Header";
import Search from "@/components/organism/search/Search";
import SwiperComponent from "@/components/swiper/swiper-banner";
import { useEffect, useState } from "react";
import SwiperComponent1 from "@/components/swiper/swiper-banner-1";

export default function Page() {
  const [windowWidth, setWindowWidth] = useState(0);

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
  const listBannerMobile = ["Home Banner.png", "Home Banner.png", "Home Banner.png", "Home Banner.png"];
  const merchants = ["Merchant.png", "Merchant.png", "Merchant.png"];
  const news = ["Artikel.png", "Artikel.png", "Artikel.png"];
  let banners = listBannerMobile;
  return (
    <>
      <div className="w-full">
        <SwiperComponent sWidth={windowWidth} banners={banners} />
        <div className="w-full h-auto relative ">
          <Image
            src={"/images/content/background/BG (Home).png"}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="w-full h-auto absolute  top-4">
            <Search />
          </div>
          <div className="w-full h-auto absolute bottom-[70px] sm:bottom-28 rounded-t-3xl overflow-hidden">
            <Image
              src={"/images/content/background/BG (Home 2).png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute z-10 top-0  w-full flex flex-col items-center  pt-4">
              <div className="w-9/12">
                <div className="w-full flex justify-between items-end">
                  <p className="font-bold text-white text-lg underline">Merchant</p>
                  <div className="w-3/12">
                    <Image
                      src={"/images/content/button/Button.png"}
                      alt="illustrasi-1"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="w-full mt-2">
                  <SwiperComponent1 sWidth={windowWidth} banners={merchants} />
                </div>
              </div>
              <div className="w-10/12 bg-white h-[2px] rounded-full my-3"></div>
              <div className="w-9/12">
                <div className="w-full flex justify-between items-end">
                  <p className="font-bold text-white text-lg underline">News</p>
                  <div className="w-3/12">
                    <Image
                      src={"/images/content/button/Button.png"}
                      alt="illustrasi-1"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="w-full mt-2">
                  <SwiperComponent1 sWidth={windowWidth} banners={news} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto absolute bottom-0">
            <Image
              src={"/images/content/footer/Footer.png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
