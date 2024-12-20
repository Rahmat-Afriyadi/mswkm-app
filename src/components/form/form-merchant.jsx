"use client";

import InputGroup from "@/components/form/input/input-group";
import Button from "./input/button";
import { useForm } from "react-hook-form";
import Checkbox from "./input/checkbox";
import MultipleSelect from "./input/multiple-select";
import { useState, useEffect } from "react";
import RichTextEditor from "./input/rich-text-editor";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MasterKategori } from "@/server/admin/master/mst-kategori";
import { MasterPicMro } from "@/server/admin/master/mst-pic-mro";
import { MasterMediaPromosi } from "@/server/admin/master/mst-media-promosi";
import { MerchantUpdate } from "@/server/admin/merchant/merchant-update";
import { MerchantAdd } from "@/server/admin/merchant/merchant-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import FormFile from "./input/input-file";
import FormFileBanner from "./input/input-file-banner";
// import CustomEditor from "./input/custom-rich";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/form/input/custom-rich"), { ssr: false });

export default function FormMerchant({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ? defaultValues : { kategori: [], media_promosi: [], nama_pic_mro: [] },
    mode: "onChange", // Enables real-time validation
  });

  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: mstKategori } = useQuery({
    queryKey: ["master-kategori"],
    queryFn: async () => await MasterKategori(),
    initialData: [{ id: "", name: "" }],
  });
  const { data: mstPIC } = useQuery({
    queryKey: ["master-pic"],
    queryFn: async () => await MasterPicMro(),
    initialData: [{ id: "", name: "" }],
  });
  const { data: mstPromosi } = useQuery({
    queryKey: ["master-promosi"],
    queryFn: async () => await MasterMediaPromosi(),
    initialData: [{ id: "", name: "" }],
  });
  const merchantMut = useMutation({
    mutationFn: isEditing ? MerchantUpdate : MerchantAdd,
  });

  useEffect(() => {
    if (!isEditing) {
      reset({}); // Mengosongkan form ketika membuka form Add
    } else if (defaultValues && mstKategori && mstPIC && mstPromosi) {
      reset(defaultValues); // Set nilai default ketika dalam mode edit
    }
  }, [mstKategori, mstPIC, mstPromosi, reset]); // eslint-disable-line

  const onSubmit = async (values) => {
    values.valid_from = new Date(values.valid_from);
    values.valid_thru = new Date(values.valid_thru);
    console.log("ini values ", values);
    if (values.kategori < 1 || !values.hasOwnProperty("kategori")) {
      return Swal.fire("Failed!", "mohon pilih satu atau lebih kategori merchant", "error");
    }
    if (values.media_promosi < 1 || !values.hasOwnProperty("media_promosi")) {
      return Swal.fire("Failed!", "mohon pilih satu atau lebih media promosi", "error");
    }
    if (values.nama_pic_mro < 1 || !values.hasOwnProperty("nama_pic_mro")) {
      return Swal.fire("Failed!", "mohon pilih satu atau lebih pic mro", "error");
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
        merchantMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["merchants"] });
            Swal.fire("Success!", `Merchant berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/merchant");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Merchant Information Information</h2>
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
            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Email address"
                id="email"
                name="email"
                type="email"
                register={register}
                validation={{
                  required: false,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email not valid",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <InputGroup
                label="Valid From"
                id="valid-from"
                name="valid_from"
                validation={{ required: "This field is required" }}
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <InputGroup
                label="Valid Thru"
                id="valid-thru"
                name="valid_thru"
                validation={{ required: "This field is required" }}
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-1 flex items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Website"
                id="website"
                name="website"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Nama PIC"
                id="nama-pic"
                name="nama_pic"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Nomor Telepon PIC"
                id="phone-number-pic"
                name="no_telp_pic"
                type="text"
                register={register}
                validation={{
                  required: false,
                  pattern: {
                    value: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
                    message: "Please enter a valid phone number",
                  },
                }}
                errors={errors}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <InputGroup
                label="Map"
                id="map"
                name="map"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-3">
              <InputGroup label="Alamat" id="alamat" name="alamat" type="text" register={register} errors={errors} />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Kategori"}
                id={"Kategori"}
                optionsList={mstKategori}
                placeholder={"Kategori"}
                name={"kategori"}
                defaultValues={isEditing ? defaultValues.kategori : null}
                setValue={setValue}
              />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Media Promosi"}
                id={"media-promosi"}
                optionsList={mstPromosi}
                placeholder={"Media Promosi"}
                name={"media_promosi"}
                defaultValues={isEditing ? defaultValues.media_promosi : null}
                setValue={setValue}
              />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Nama PIC MRO"}
                id={"nama-pic-mro"}
                optionsList={mstPIC}
                placeholder={"Nama PIC MRO"}
                name={"nama_pic_mro"}
                defaultValues={isEditing ? defaultValues.nama_pic_mro : null}
                setValue={setValue}
              />
            </div>
            <div className="col-span-6">
              <RichTextEditor name={"deskripsi"} setValue={setValue} defaultValues={defaultValues.deskripsi} />
            </div>
            {/* <div className="col-span-6">
              <CustomEditor initialData="<h1>Hello from CKEditor in Next.js!</h1>" />
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/merchant")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
