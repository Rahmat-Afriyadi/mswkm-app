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

export default function FormMerchant({ isEditing = false, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditing ? defaultValues : {},
    mode: "onChange", // Enables real-time validation
  });

  const opstionsC = [
    { id: "id", name: "name" },
    { id: "id1", name: "name1" },
    { id: "id2", name: "name2" },
  ];

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

  console.log("ini master kategori yaa ", mstKategori);

  useEffect(() => {
    if (!isEditing) {
      reset(); // Mengosongkan form ketika membuka form Add
    } else if (defaultValues && mstKategori && mstPIC && mstPromosi) {
      reset(defaultValues); // Set nilai default ketika dalam mode edit
    }
  }, [mstKategori, mstPIC, mstPromosi, reset]); // eslint-disable-line

  const onSubmit = async (values) => {
    console.log("ini values ", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Merchant Information Information</h2>
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
            <div className="sm:col-span-2">
              <InputGroup
                label="Valid From"
                id="valid-from"
                name="valid_from"
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-2">
              <InputGroup
                label="Valid Thru"
                id="valid-thru"
                name="valid_thru"
                type="date"
                register={register}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-1 flex items-end">
              <Checkbox label="Aktif" id="is-active" name="is_active" register={register} errors={errors} />
            </div>
            <div className="sm:col-span-3">
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

            {/* <div className="sm:col-span-2 sm:col-start-1">
              <Select
                label="Gender"
                id="gender"
                name="gender"
                options={opstionsC}
                register={register}
                errors={errors}
                validation={{ required: "This field is required" }}
              />
            </div> */}
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama PIC"
                id="nama-pic"
                name="nama-pic"
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
                name="phone_number_pic"
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
                setValue={setValue}
              />
            </div>
            <div className="col-span-3">
              <MultipleSelect
                label={"Nama PIC MRO"}
                id={"nama-pic-mro"}
                optionsList={mstPIC}
                placeholder={"Nama PIC MRO"}
                name={"pic_mro"}
                setValue={setValue}
              />
            </div>
            <div className="col-span-6">
              <RichTextEditor />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/candidates")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
