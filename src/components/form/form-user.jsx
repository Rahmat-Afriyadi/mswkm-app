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
import { OutletUpdate } from "@/server/admin/outlet/outlet-update";
import { OutletAdd } from "@/server/admin/outlet/outlet-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import FormFile from "./input/input-file";
import Select from "./input/select";
import { MasterMerchant } from "@/server/admin/master/mst-merchant";
import InputNumber from "./input/input-number";

export default function FormUser({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ? defaultValues : { media_promosi: [] },
    mode: "onChange", // Enables real-time validation
  });

  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: mstPromosi } = useQuery({
    queryKey: ["master-promosi"],
    queryFn: async () => await MasterMediaPromosi(),
    initialData: [{ id: "", name: "" }],
  });
  const { data: mstMerchant } = useQuery({
    queryKey: ["master-merchant"],
    queryFn: async () => await MasterMerchant(),
    initialData: [{ id: "", name: "" }],
  });
  const outletMut = useMutation({
    mutationFn: isEditing ? OutletUpdate : OutletAdd,
  });

  useEffect(() => {
    if (!isEditing) {
      reset({}); // Mengosongkan form ketika membuka form Add
    } else if (defaultValues && mstPromosi && mstMerchant) {
      reset(defaultValues); // Set nilai default ketika dalam mode edit
    }
  }, [mstMerchant, mstPromosi, reset]); // eslint-disable-line

  console.log("ini default values yaa ", defaultValues);

  const onSubmit = async (values) => {
    console.log("ini values ", values);
    if (values.media_promosi < 1 || !values.hasOwnProperty("media_promosi")) {
      return Swal.fire("Failed!", "mohon pilih satu atau lebih media promosi", "error");
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
        outletMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["outlets"] });
            Swal.fire("Success!", `Outlet berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/outlet");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Outlet Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
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
            <div className="sm:col-span-3">
              <InputNumber
                label="Latitude"
                id="latitude"
                name="latitude"
                max={90}
                min={-90}
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputNumber
                label="Longitude"
                id="longitude"
                name="longitude"
                max={180}
                min={-180}
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
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
            <div className="sm:col-span-3">
              <InputGroup
                label="Kota"
                id="kota"
                name="kota"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Kecamatan"
                id="kecamatan"
                name="kecamatan"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Kelurahan"
                id="kelurahan"
                name="kelurahan"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Kodepos"
                id="kodepos"
                name="kodepos"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
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

            <div className="sm:col-span-3">
              <Select
                label="Merchant"
                id="merchant"
                name="merchant_id"
                options={mstMerchant}
                register={register}
                errors={errors}
                validation={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-3">
              <InputGroup label="Alamat" id="alamat" name="alamat" type="text" register={register} errors={errors} />
            </div>
            <div className="sm:col-span-1 flex items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
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
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/outlet")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
