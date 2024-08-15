"use client";

import axios from "@/lib/axios";
import { addCard } from "@/server/member/add-card";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";


export default function PageFrame() {
  const queryCLient = useQueryClient()
  const { register, handleSubmit } = useForm();
  const mutTambahKartu = useMutation({
    mutationFn: addCard,
  });

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutTambahKartu.mutate(values, {
          onSuccess: (data) => {
            
            queryCLient.invalidateQueries({ queryKey: ['member-cards'] })
            Swal.fire("Success!", "Kartu berhasil ditambahkan", "info");
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
    <form className="space-y-6 px-9" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-12 gap-x-4">
        <div className="col-span-12 md:col-span-5 xl:col-span-4">
          <label htmlFor="kode" className="block text-sm font-medium leading-6 text-gray-900">
            Nomor Kartu / Nomor Mesin
          </label>
          <div className="mt-2">
            <input
              id="kode"
              name="kode"
              type="text"
              autoComplete="kode"
              {...register("kode", {
                required: "This field is required",
              })}
              required
              className="h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-12 mb-5 md:col-span-5 md:mb-0 xl:col-span-4 ">
          <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
            Nama
          </label>
          <div className="mt-2">
            <input
              id="nama"
              name="nama"
              type="text"
              autoComplete="nama"
              {...register("nama", {
                required: "This field is required",
              })}
              required
              className="h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-4 md:col-span-2 xl:col-span-2 flex items-end justify-center">
          <button
            type="submit"
            className="align-middle w-full h-12 flex justify-center rounded-md bg-indigo-600 px-3 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center"
          >
            Tambah
          </button>
        </div>
      </div>
    </form>
  );
}
