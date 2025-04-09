"use client";

import InputGroup from "@/components/form/input/input-group";
import Button from "./input/button";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { RoleAdd } from "@/server/admin/role/role-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { RoleUpdate } from "@/server/admin/role/role-update";
import MultipleSelect from "./input/multiple-select";

export default function FormRole({ isEditing = false, defaultValues }) {
  const allPermissions = [
    { id: "merchant", name: "Merchant" },
    { id: "outlet", name: "Outlet" },
    { id: "role", name: "Role" },
    { id: "user", name: "User" },
  ];

  if (isEditing) {
    defaultValues.permissions = defaultValues.permissions.filter((perm) =>
      allPermissions.map((item) => item.id).includes(perm.id)
    );
  }

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
  const roleMut = useMutation({
    mutationFn: isEditing ? RoleUpdate : RoleAdd,
  });

  const onSubmit = async (values) => {
    values.id = parseInt(values.id);
    values.permissions = values.permissions.map((perm) => {
      return { name: perm.id };
    });
    console.log("ini values yaa ", values);
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        roleMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            Swal.fire("Success!", `Role berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/role");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Role Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama Role"
                id="nama"
                name="name"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>

            <div className="col-span-3">
              <MultipleSelect
                label={"Permissions"}
                id={"Permissions"}
                optionsList={allPermissions}
                placeholder={"Permissions"}
                name={"permissions"}
                defaultValues={isEditing ? defaultValues.permissions : null}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/role")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
