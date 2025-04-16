"use client";

import dynamic from "next/dynamic";

const Button = dynamic(() => import("./input/button"), { ssr: false });
const Checkbox = dynamic(() => import("./input/checkbox"), { ssr: false });
const FormFileBanner = dynamic(() => import("./input/input-file-banner"), { ssr: false });
const FormFile = dynamic(() => import("./input/input-file"), { ssr: false });

import { useForm } from "react-hook-form";
import { useState, useEffect, use } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { BannerUpdate } from "@/server/admin/banner/banner-update";
import { BannerAdd } from "@/server/admin/banner/banner-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FormBanner({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ? defaultValues : { is_active: true, pin: true },
    mode: "onChange", // Enables real-time validation
  });

  const router = useRouter();

  const queryClient = useQueryClient();
  const bannersMut = useMutation({
    mutationFn: isEditing ? BannerUpdate : BannerAdd,
  });

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        bannersMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["read-banners"] });
            Swal.fire("Success!", `Banner berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/banner");
            });
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
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Banner Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-6 mt-10 gap-x-6 gap-y-8">
            <div className="col-span-6 sm:col-span-3">
              <FormFileBanner
                name={"banner"}
                id={"banner"}
                setValue={setValue}
                defaultValues={isEditing && defaultValues.banner != null ? defaultValues.banner : ""}
              />
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-6 sm:col-span-2 flex justify-between items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
              <Checkbox label="Pin" id="pin" name="pin" register={register} errors={errors} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/banner")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
