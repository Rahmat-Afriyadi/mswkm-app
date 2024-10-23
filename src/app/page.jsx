"use client";

import Image from "next/image";
import Header from "@/components/organism/header/Header";
import Search from "@/components/organism/search/Search";
import SwiperComponent from "@/components/swiper/swiper-banner";
import { useEffect, useState } from "react";
import SwiperComponent1 from "@/components/swiper/swiper-banner-1";
import bgHome1 from "../../public/images/content/background/BG (Home).png";

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
  const listBannerMobile = ["home/Home Banner.jpg", "home/Home Banner 2.jpg", "home/Home Banner 3.jpg"];
  const listBannerDesktop = ["home/Home Banner.jpg", "home/Home Banner 2.jpg", "home/Home Banner 3.jpg"];
  const merchants = ["Merchant.png", "Merchant.png", "Merchant.png"];
  const news = ["Artikel.png", "Artikel.png", "Artikel.png"];
  let banners = windowWidth > 768 ? listBannerDesktop : listBannerMobile;
  return (
    <>
      <div className="w-full">
        <SwiperComponent sWidth={windowWidth} banners={banners} />
        <div className="w-full h-auto md:h-[515px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] relative ">
          <Image
            src={bgHome1}
            alt="illustrasi-1"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height:
                windowWidth > 1279 ? "700px" : windowWidth > 1023 ? "600px" : windowWidth > 767 ? "500px" : "auto",
            }}
          />
          <div className="w-full h-auto absolute top-4 z-20">
            <Search />
          </div>

          <div className=" absolute w-full h-auto  bottom-16 md:h-[300px] lg:h-[400px] xl:h-[500px] md:top-[100px] sm:bottom-16 rounded-t-3xl overflow-hidden">
            <Image
              src={"/images/content/background/BG (Home 2).png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            {/* <div className="absolute z-10 top-0  w-full flex flex-col items-center  pt-4"> */}
            <div className="absolute z-10 top-0  w-full grid grid-cols-12 pt-4 md:px-12">
              <div className="col-span-12 md:col-span-5 flex flex-col items-center md:-mr-8">
                <div className="w-9/12 md:w-full flex justify-between items-end">
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
                <div className="w-9/12 md:w-full mt-2 md:mt-7">
                  <SwiperComponent1 sWidth={windowWidth} banners={merchants} />
                </div>
              </div>

              {windowWidth > 767 && (
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-[2px] rounded-lg h-full bg-red-600"></div>
                </div>
              )}

              {windowWidth < 768 && (
                <div className="col-span-12 flex justify-center">
                  <div className="w-9/12 bg-white h-[2px] rounded-full my-3"></div>
                </div>
              )}

              <div className="col-span-12 md:col-span-5 flex flex-col items-center md:-ml-8">
                <div className="w-9/12 md:w-full flex justify-between items-end">
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
                <div className="w-9/12 md:w-full mt-2 md:mt-7">
                  <SwiperComponent1 sWidth={windowWidth} banners={news} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-auto absolute bottom-0">
            {windowWidth < 641 && (
              <Image
                src={"/images/content/footer/Footer.png"}
                alt="illustrasi-1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            )}
            {windowWidth > 640 && (
              <Image
                src={"/images/content/footer/Footer-lg.png"}
                alt="illustrasi-1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
