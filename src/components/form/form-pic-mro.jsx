"use client";

import InputGroup from "@/components/form/input/input-group";
import Button from "./input/button";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { PicMroAdd } from "@/server/admin/pic-mro/pic-mro-add";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { PicMroUpdate } from "@/server/admin/pic-mro/pic-mro-update";

export default function FormPicMro({ isEditing = false, defaultValues }) {
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
  const mediaPromosiMut = useMutation({
    mutationFn: isEditing ? PicMroUpdate : PicMroAdd,
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
        mediaPromosiMut.mutate(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["pic-mros"] });
            Swal.fire("Success!", `PicMro berhasil ${isEditing ? "diperbarui" : "ditambahkan"}`, "info").then(() => {
              router.replace("/admin/pic-mro");
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
          <h2 className="text-base font-semibold leading-7 text-gray-900">PicMro Information Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputGroup
                label="Nama PicMro"
                id="nama"
                name="name"
                type="text"
                register={register}
                validation={{ required: "This field is required" }}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button label="Cancel" type="button" theme="secondary" onClick={() => router.replace("/admin/pic-mro")} />
        <Button label="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
}
