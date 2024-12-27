"use client";
import CardLg from "@/components/organism/swiper/card-lg";
import CardSwiper from "@/components/organism/swiper/card-swiper";
import CardSwiperLg from "@/components/organism/swiper/card-swiper-lg";
import { addCard } from "@/server/member/add-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router, session]);

  const queryCLient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const mutTambahKartu = useMutation({
    mutationFn: addCard,
  });
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

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutTambahKartu.mutate(values, {
          onSuccess: (data) => {
            queryCLient.invalidateQueries({ queryKey: ["member-cards"] });
            Swal.fire("Success!", "Kartu berhasil ditambahkan", "info");
          },
          onError: (e) => {
            console.log("ini error ", e);
            Swal.fire("Failed!", e.response.data.message, "error");
          },
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    // <div className="w-full bg-[#54565a] h-auto">
    <>
      <div
        className={`w-full bg-cover bg-center ${windowWidth > 768 ? "h-screen" : "h-auto"}`}
        style={{ backgroundImage: `url('${BASE_URL}/uploads/BG.PNG')` }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="w-9/12 h-3 mt-2">
            <div className="w-full text-center text-white font-bold text-xl">My Card</div>
          </div>
          <br />
          <div className="w-10/12 md:w-11/12 bg-white h-[2px] rounded-lg"></div>
          <br />
          <div className="w-9/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex justify-center">
                <input
                  {...register("kode", {
                    required: "This field is required",
                  })}
                  type="text"
                  name="kode"
                  id="kode"
                  className="rounded-l-md placeholder:text-sm bg-white py-[3px] md:w-6/12  md:h-12"
                  placeholder="Masukan Nomor Mesin"
                />
                <button type="submit">
                  <div className="w-[37px] h-[33px] md:h-[48px] md:w-[54px] cursor-pointer">
                    <Image
                      src={"/images/content/button/Button 3.png"}
                      alt="illustrasi-1"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`w-full flex flex-col items-center bg-cover bg-center h-auto ${
            windowWidth > 767 ? "relative" : ""
          }`}
        >
          {windowWidth > 767 && (
            <div className="w-full h-auto relative">
              <div className="w-8 h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 z-50 absolute md:left-[2.5%] lg:left-[25px] xl:left-[31px] 2xl:left-[37px] cursor-pointer md:top-3 inset-0 my-auto">
                <ChevronLeftIcon className="h-full w-full text-white kiri-in" />
              </div>
              <div className="w-8 h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 z-50  absolute md:left-[37.7%] lg:left-[377.5px] xl:left-[478px] 2xl:left-[37.5%] cursor-pointer md:top-3 inset-0 my-auto">
                <ChevronRightIcon className="h-full w-full text-white kanan-in " />
              </div>
              <CardLg />
            </div>
          )}

          <div className={`w-full h-auto top-0 ${windowWidth > 767 ? "absolute" : ""}`}>
            {windowWidth > 767 && <CardSwiperLg />}
            {windowWidth < 768 && <CardSwiper />}
          </div>
        </div>

        {/* <div className="w-full h-auto bottom-0 lg:mt-8 xl:mt-12">
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
      </div> */}
      </div>
      <div className="w-full h-auto -bottom-16">
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
    </>
  );
}
