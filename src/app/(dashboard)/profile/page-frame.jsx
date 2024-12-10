"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InputGroup from "@/components/organism/input/input-group";
import Datepicker from "react-tailwindcss-datepicker";
import Image from "next/image";
import { UploadImageProfile } from "@/server/profile/upload-image-profile";
import { updateProfile } from "@/server/profile/update-profile";
import Swal from "sweetalert2";
import Photo from "../../../../public/images/content/profile/Photo.png";

export default function PageFrame({ defaultValues }) {
  const [valueTglLhr, setValueTglLhr] = useState({
    startDate: defaultValues.tgl_lahir != null ? defaultValues.tgl_lahir.substring(0, 10) : null,
    endDate: defaultValues.tgl_lahir != null ? defaultValues.tgl_lahir.substring(0, 10) : null,
  });
  const [imageProfile, setImageProfile] = useState(defaultValues.img_profile);
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      laki_laki: defaultValues.jns_kelamin == "Laki-laki",
      perempuan: defaultValues.jns_kelamin == "Perempuan",
    },
  });
  const queryCLient = useQueryClient();
  const imageProfileMut = useMutation({
    mutationFn: UploadImageProfile,
  });
  const updateProfileMut = useMutation({
    mutationFn: updateProfile,
  });

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "PrintScreen" || event.keyCode === 44) {
  //       event.preventDefault();
  //       alert("Print Screen is disabled.");
  //     }
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const onSubmit = (data) => {
    data.tgl_lahir = new Date(valueTglLhr.startDate);
    data.img_profile = imageProfile;
    data.jns_kelamin = data.perempuan ? "Perempuan" : data.laki_laki ? "Laki-laki" : "";
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        updateProfileMut.mutate(data, {
          onSuccess: (data) => {
            queryCLient.invalidateQueries({ queryKey: ["profile-me"] });
            Swal.fire("Success!", "Profile berhasil diupdate", "info");
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
    <div className="h-screen w-8/12 md:w-11/12">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center">
          <label
            htmlFor="profile_image"
            className="w-20 h-20 md:w-40 md:h-40 bg-cover bg-center rounded-full md:mt-2"
            style={{
              backgroundImage: `url('${
                imageProfile == "" ? "/images/content/profile/Photo.png" : "http://192.168.70.17:3003" + imageProfile
              }')`,
            }}
          ></label>
          <input
            type="file"
            id="profile_image"
            className="hidden"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              imageProfileMut.mutate(formData, {
                onSuccess: (data) => {
                  queryCLient.invalidateQueries({ queryKey: ["profile-me"] });
                  setImageProfile(data.data.data);
                },
                onError: (e) => {
                  console.log("ini error ", e);
                },
              });
            }}
          />
        </div>
        <div className="grid grid-cols-12 gap-x-7">
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <InputGroup
                label="Nama"
                id="full-name"
                name="name"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <InputGroup
                label="Email"
                id="email"
                name="email"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <InputGroup
                label="Phone"
                id="phone"
                name="no_hp"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <label htmlFor={"jenis_kelamin"} className="block text-sm leading-6 text-white font-bold">
                Jenis Kelamin
              </label>
              {/* <input type="checkbox" {...register("laki_laki")} className="hidden" /> */}
              {/* <input type="checkbox" {...register("perempuan")} className="hidden" /> */}
              <div className="w-full flex mt-1">
                <div
                  className="w-6/12"
                  onClick={() => {
                    setValue("laki_laki", true);
                    setValue("perempuan", false);
                  }}
                >
                  <div className="w-full flex">
                    <div
                      className={`mt-1 h-4 w-4 rounded-full border-[3px] border-[#af282f] ${
                        watch("laki_laki") ? "bg-black" : ""
                      }`}
                    ></div>
                    <p className="ml-1 text-white">Laki Laki</p>
                  </div>
                </div>
                <div
                  className="w-6/12"
                  onClick={() => {
                    setValue("perempuan", true);
                    setValue("laki_laki", false);
                  }}
                >
                  <div className="w-full flex">
                    <div
                      className={`mt-1 h-4 w-4 rounded-full border-[3px] border-[#af282f] ${
                        watch("perempuan") ? "bg-black" : ""
                      } `}
                    ></div>
                    <p className="ml-1 text-white">Perempuan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <label htmlFor={"tgl_lahir"} className="block text-sm leading-6 text-white font-bold">
                Tanggal Lahir
              </label>
              <Datepicker
                popoverDirection="up"
                primaryColor={"emerald"}
                displayFormat="DD/MM/YYYY"
                placeholder="_ _ /_ _ /_ _ _ _"
                inputClassName="pl-12 mt-1 block w-full rounded-md border-0 py-2 text-white shadow-sm ring-1 ring-inset bg-slate-800 ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                toggleClassName="absolute rounded-r-lg -top-0  left-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed text-white"
                dayClassName={(date) => (true ? "bg-red-200 text-red-600 cursor-not-allowed" : "")}
                useRange={false}
                asSingle={true}
                value={valueTglLhr}
                onChange={(newValue) => setValueTglLhr(newValue)}
                singleDatePicker={true}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="w-full mt-3 md:mt-9">
              <InputGroup
                label="Alamat"
                id="alamat"
                name="alamat"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="w-full mt-4 md:mt-16 flex justify-center">
              <button className="w-7/12 md:w-2/12" type="submit">
                <Image
                  alt="slide_1"
                  src={`/images/content/button/Button 2.png`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
