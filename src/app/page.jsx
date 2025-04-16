"use client";

import Image from "next/image";
import Header from "@/components/organism/header/Header";
import Search from "@/components/organism/search/Search";
import SwiperComponent from "@/components/swiper/swiper-banner";
import { useEffect, useState } from "react";
import SwiperComponent1 from "@/components/swiper/swiper-banner-1";
import bgHome1 from "../../public/images/content/background/BG (Home).png";
import { useRouter } from "next/navigation";
import { MerchantHomePin } from "@/server/admin/merchant/merchant-home-pin";
import { useQuery } from "@tanstack/react-query";
import { NewsHomePin } from "@/server/admin/news/news-home-pin";
import { BannerHomePin } from "@/server/admin/banner/banner-home-pin";

export default function Page() {
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

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
  // const listBannerMobile = ["home/Home Banner.jpg", "home/Home Banner 2.jpg", "home/Home Banner 3.jpg"];
  // const listBannerDesktop = ["home/Home Banner.jpg", "home/Home Banner 2.jpg", "home/Home Banner 3.jpg"];
  // const merchants = ["Merchant.png", "Merchant.png", "Merchant.png"];
  // const news = ["Artikel.png", "Artikel.png", "Artikel.png"];
  const { data: merchants } = useQuery({
    queryKey: ["merchant-home-pin"],
    queryFn: async () => await MerchantHomePin(),
    initialData: [{ id: "", banner: "", link: "/" }],
  });
  const { data: news } = useQuery({
    queryKey: ["news-home-pin"],
    queryFn: async () => await NewsHomePin(),
    initialData: [{ id: "", banner: "" }],
  });
  const { data: listBannerDesktop } = useQuery({
    queryKey: ["banner-home-pin"],
    queryFn: async () => await BannerHomePin(),
    initialData: [{ id: "", banner: "" }],
  });
  let banners = windowWidth > 768 ? listBannerDesktop : listBannerDesktop;
  return (
    <>
      <div className="w-full">
        <Header />
        <SwiperComponent sWidth={windowWidth} banners={banners} timeAutoPlay={10000} />
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
          {/* <div className="w-full h-auto absolute top-4 z-20">
            <Search />
          </div> */}

          <div className=" absolute w-full h-auto  bottom-20 md:h-[300px] lg:h-[400px] xl:h-[500px] md:top-[50px] sm:bottom-20 lg:bottom-32 rounded-t-3xl overflow-hidden">
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
                  <div className="w-3/12 cursor-pointer" onClick={() => router.push("/merchant")}>
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
                  <SwiperComponent1
                    sWidth={windowWidth}
                    timeAutoPlay={5000}
                    banners={merchants.map((e) => {
                      return { ...e, link: "/merchant/detail/" + e.id };
                    })}
                  />
                </div>
              </div>

              {windowWidth > 767 && (
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-[2px] rounded-lg h-full bg-red-600"></div>
                </div>
              )}

              {windowWidth < 768 && (
                <div className="col-span-12 flex justify-center -mt-1">
                  <div className="w-9/12 bg-white h-[2px] rounded-full mt-3 mb-1"></div>
                </div>
              )}

              <div className="col-span-12 md:col-span-5 flex flex-col items-center md:-ml-8">
                <div className="w-9/12 md:w-full flex justify-between items-end">
                  <p className="font-bold text-white text-lg underline">News</p>
                  <div className="w-3/12 cursor-pointer" onClick={() => router.push("/news")}>
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
                  <SwiperComponent1
                    sWidth={windowWidth}
                    timeAutoPlay={8000}
                    banners={news.map((e) => {
                      return { ...e, link: "/news/detail/" + e.id };
                    })}
                  />
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
