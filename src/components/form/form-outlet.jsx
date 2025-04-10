"use client";

import dynamic from "next/dynamic";
const InputGroup = dynamic(() => import("@/components/form/input/input-group"), { ssr: false });
const Button = dynamic(() => import("./input/button"), { ssr: false });
const Checkbox = dynamic(() => import("./input/checkbox"), { ssr: false });
const MultipleSelect = dynamic(() => import("./input/multiple-select"), { ssr: false });
const Select = dynamic(() => import("./input/select"), { ssr: false });
const InputNumber = dynamic(() => import("./input/input-number"), { ssr: false });
const SearchableSelect = dynamic(() => import("@/components/form/input/searchable-select"), { ssr: false });
const DrawerCenter = dynamic(() => import("@/components/drawer/drawer-center-transparent"));

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { MasterMediaPromosi } from "@/server/admin/master/mst-media-promosi";
import { OutletUpdate } from "@/server/admin/outlet/outlet-update";
import { OutletAdd } from "@/server/admin/outlet/outlet-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { MasterMerchant } from "@/server/admin/master/mst-merchant";
import { MasterKodepos } from "@/server/admin/master/mst-kodepos";

export default function FormOutlet({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ? defaultValues : { media_promosi: [] },
    mode: "onChange", // Enables real-time validation
  });

  const selectedKodepos = watch("selected_kodepos");
  const selectedMerchant = watch("selected_merchant");

  const [openKodepos, setOpenKodepos] = useState(false);
  const [openMerchant, setOpenMerchant] = useState(false);

  const router = useRouter();

  const queryClient = useQueryClient();
  const { data: mstPromosi } = useQuery({
    queryKey: ["master-promosi"],
    queryFn: async () => await MasterMediaPromosi(),
    initialData: [{ id: "", name: "" }],
  });
  const { data: kodepos } = useQuery({
    queryKey: ["kodepos"],
    refetchOnWindowFocus: false,
    queryFn: async () => await MasterKodepos(),
    initialData: { data: [{ value: "", nama: "" }] },
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
    if (!defaultValues) return; // Early return jika defaultValues tidak ada

    const isDataReady = [mstPromosi].every(Boolean);
    if (!isDataReady) return; // Early return jika ada data yang belum siap

    const fields = ["media_promosi"];

    fields.forEach((field) => {
      if (defaultValues?.[field]) {
        setValue(field, defaultValues[field]);
      }
    });
  }, [defaultValues, mstPromosi]); // eslint-disable-line

  useEffect(() => {
    setValue("merchant_name", mstMerchant.filter((e) => e.id == defaultValues.merchant_id)[0]?.name);
  }, [defaultValues, mstMerchant]); // eslint-disable-line

  useEffect(() => {
    if (selectedKodepos) {
      console.log("selected kodepos ", selectedKodepos);
      const fillKodepos = selectedKodepos.split(", ");

      setValue("kota", fillKodepos[0]);
      setValue("kecamatan", fillKodepos[1]);
      setValue("kelurahan", fillKodepos[2]);
      setValue("kodepos", fillKodepos[3]);
    }
  }, [selectedKodepos]); // eslint-disable-line

  useEffect(() => {
    if (selectedMerchant) {
      setValue("merchant_name", selectedMerchant);
      setValue("merchant_id", mstMerchant.filter((e) => e.name == selectedMerchant)[0].id);
    }
  }, [selectedMerchant]); // eslint-disable-line

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
          <DrawerCenter open={openKodepos} setOpen={setOpenKodepos}>
            <div className="h-screen">
              <SearchableSelect
                options={kodepos?.data}
                name={"selected_kodepos"}
                setValue={setValue}
                setOpen={setOpenKodepos}
              />
            </div>
          </DrawerCenter>
          <DrawerCenter open={openMerchant} setOpen={setOpenMerchant}>
            <div className="h-screen">
              <SearchableSelect
                options={mstMerchant.map((e) => e.name)}
                name={"selected_merchant"}
                setValue={setValue}
                setOpen={setOpenMerchant}
              />
            </div>
          </DrawerCenter>

          <div className="grid grid-cols-3  mt-10 gap-x-6 gap-y-8 ">
            <div className="col-span-3 sm:col-span-1">
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
            <div className="col-span-3 sm:col-span-1">
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
            <div className="col-span-3 sm:col-span-1 flex items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
            </div>
            <div className="col-span-3 sm:col-span-1">
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
            <div className="col-span-3 sm:col-span-1">
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

            <div className="col-span-3 sm:col-span-1 ">
              <InputGroup label="Alamat" id="alamat" name="alamat" type="text" register={register} errors={errors} />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputGroup
                readOnly={true}
                onClick={() => setOpenKodepos(true)}
                label="Kota"
                id="kota"
                name="kota"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputGroup
                readOnly={true}
                onClick={() => setOpenKodepos(true)}
                label="Kecamatan"
                id="kecamatan"
                name="kecamatan"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputGroup
                readOnly={true}
                onClick={() => setOpenKodepos(true)}
                label="Kelurahan"
                id="kelurahan"
                name="kelurahan"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputGroup
                readOnly={true}
                onClick={() => setOpenKodepos(true)}
                label="Kodepos"
                id="kodepos"
                name="kodepos"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
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

            <div className="col-span-3 sm:col-span-1">
              <InputGroup
                readOnly={true}
                onClick={() => setOpenMerchant(true)}
                label="Merchant"
                id="merchant"
                name="merchant_name"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
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
