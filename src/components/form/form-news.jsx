"use client";

import dynamic from "next/dynamic";

const InputGroup = dynamic(() => import("@/components/form/input/input-group"), { ssr: false });
const Button = dynamic(() => import("./input/button"), { ssr: false });
const Checkbox = dynamic(() => import("./input/checkbox"), { ssr: false });
const MultipleSelect = dynamic(() => import("./input/multiple-select"), { ssr: false });
const FormFileBanner = dynamic(() => import("./input/input-file-banner"), { ssr: false });
const FormFile = dynamic(() => import("./input/input-file"), { ssr: false });

import { useForm } from "react-hook-form";
import { useState, useEffect, use } from "react";
import RichTextEditor from "./input/rich-text-editor";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MasterKategoriNews } from "@/server/admin/master/mst-kategori-news";
import { NewsUpdate } from "@/server/admin/news/news-update";
import { NewsAdd } from "@/server/admin/news/news-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FormNews({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing
      ? defaultValues
      : { kategori: [], media_promosi: [], nama_pic_mro: [], is_active: true, pin: true },
    mode: "onChange", // Enables real-time validation
  });

  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: mstKategori } = useQuery({
    queryKey: ["master-kategori"],
    queryFn: async () => await MasterKategoriNews(),
    initialData: [{ id: "", name: "" }],
  });
  const newsMut = useMutation({
    mutationFn: isEditing ? NewsUpdate : NewsAdd,
  });

  useEffect(() => {
    if (!defaultValues) return; // Early return jika defaultValues tidak ada
    let finalValue = [];
    if (defaultValues?.kategori && mstKategori[0]?.id !== "") {
      finalValue = defaultValues?.kategori.filter((perm) => mstKategori.map((item) => item.id).includes(perm.id));
      if (finalValue.length > 0) {
        defaultValues.kategori = finalValue;
      } else {
        defaultValues.kategori = null;
      }
    }
  }, [defaultValues, mstKategori]); // eslint-disable-line

  const onSubmit = async (values) => {
    values.valid_from = new Date(values.valid_from);
    values.valid_thru = new Date(values.valid_thru);
    if (values.kategori < 1 || !values.hasOwnProperty("kategori")) {
      return Swal.fire("Failed!", "mohon pilih satu atau lebih kategori news", "error");
    }
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        newsMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["read-news"] });
            Swal.fire("Success!", `News berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/news");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">News Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-6 mt-10 gap-x-6 gap-y-8">
            <div className="col-span-6 sm:col-span-3 flex items-center">
              <FormFile
                name={"logo"}
                id={"logo"}
                setValue={setValue}
                defaultValues={isEditing && defaultValues.logo != null ? defaultValues.logo : ""}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <FormFileBanner
                name={"banner"}
                id={"banner"}
                setValue={setValue}
                defaultValues={isEditing && defaultValues.banner != null ? defaultValues.banner : ""}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Nama"
                id="nama"
                name="nama"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-2 flex justify-between items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
              <Checkbox label="Pin" id="pin" name="pin" register={register} errors={errors} />
              <Checkbox label="Home Pin" id="home-pin" name="home_pin" register={register} errors={errors} />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Kategori"}
                id={"Kategori"}
                optionsList={mstKategori}
                placeholder={"Kategori"}
                defaultValues={isEditing ? defaultValues?.kategori : null}
                name={"kategori"}
                setValue={setValue}
              />
            </div>
            <div className="col-span-6">
              <RichTextEditor name={"deskripsi"} setValue={setValue} defaultValues={defaultValues.deskripsi} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/news")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
