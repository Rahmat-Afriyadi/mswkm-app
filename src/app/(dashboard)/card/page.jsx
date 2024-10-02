"use client";
import CardSwiper from "@/components/organism/swiper/card-swiper";
import { addCard } from "@/server/member/add-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import bgImage from "../../../../public/images/content/background/BG.png";

export default function Page() {
  const queryCLient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const mutTambahKartu = useMutation({
    mutationFn: addCard,
  });

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
    <div className="w-full bg-[#54565a]">
      <div className="w-full flex flex-col items-center">
        <div className="w-9/12 h-3 mt-2">
          <div className="w-full text-center text-white font-bold text-xl">My Card</div>
        </div>
        <br />
        <div className="w-10/12 bg-white h-[2px] rounded-lg"></div>
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
                className="rounded-l-md placeholder:text-sm bg-white py-[3px]"
                placeholder="Masukan Nomor Mesin"
              />
              <button type="submit">
                <div className="w-[37px] h-[33px] cursor-pointer">
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
      <div className="w-full h-auto relative ">
        <Image
          src={bgImage}
          alt="illustrasi-1"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />

        <div className="absolute z-10 top-0  w-full flex flex-col items-center ">
          <div className="w-full">
            <CardSwiper />
          </div>
        </div>
        <div className="w-full h-auto absolute -bottom-16">
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
  );
}
