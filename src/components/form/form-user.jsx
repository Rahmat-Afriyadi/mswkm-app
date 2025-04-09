"use client";

import InputGroup from "@/components/form/input/input-group";
import Button from "./input/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { UserAdd } from "@/server/admin/user/user-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Select from "./input/select";
import { MasterRoles } from "@/server/admin/master/mst-roles";
import { UserUpdate } from "@/server/admin/user/user-update";

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
  const { data: mstRole } = useQuery({
    queryKey: ["master-roles"],
    queryFn: async () => await MasterRoles(),
    initialData: [{ id: "", name: "" }],
  });
  const userMut = useMutation({
    mutationFn: isEditing ? UserUpdate : UserAdd,
  });

  useEffect(() => {
    if (!defaultValues) return; // Early return jika defaultValues tidak ada

    const isDataReady = [mstRole].every(Boolean);
    if (!isDataReady) return; // Early return jika ada data yang belum siap

    const fields = ["role_id"];

    fields.forEach((field) => {
      if (defaultValues?.[field]) {
        setValue(field, defaultValues[field]);
      }
    });
  }, [defaultValues, mstRole]); // eslint-disable-line

  const onSubmit = async (values) => {
    values.role_id = parseInt(values.role_id);
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        userMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            Swal.fire("Success!", `User berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/user");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">User Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputGroup
                label="Username"
                id="Username"
                name="username"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama"
                id="nama"
                name="name"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
            <div className="sm:col-span-3">
              <InputGroup
                label="Password"
                id="password"
                name="password"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <Select
                label="Role"
                id="role_id"
                name="role_id"
                options={mstRole}
                register={register}
                errors={errors}
                validation={{ required: "This field is required" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/user")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
