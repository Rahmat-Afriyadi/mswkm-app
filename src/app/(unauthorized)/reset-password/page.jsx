"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordByOtp } from "@/server/auth/reset-password-by-otp";
import { useMutation } from "@tanstack/react-query";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams();
  const mutation = useMutation({
    mutationFn: resetPasswordByOtp,
  })

  const onSubmit = async (data) => {
    data.token = searchParams.get("zxcvb")
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutation.mutate(data, {
          onSuccess: (data) => {
            Swal.fire("Info!", data.data.message, "info");
            router.push("/login")
          },
          onError: (e) => {
            Swal.fire("Failed!", e.response.data.message, "error");
          },
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    
  };

  return (
    <div className="flex flex-col h-screen justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
      <div className="sm:w-full md:w-[500px] mx-auto shadow-lg bg-slate-50 rounded-lg p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          {message != "" && <div className="text-center bg-red rounded-lg text-white py-1 ">{message}</div>}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password Baru
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password" 
                  autoComplete="password"
                  {...register("password", {
                    required: "This field is required",
                  })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                Konfirmasi Password
              </label>
              <div className="mt-2">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="password_confirmation"
                  {...register("password_confirmation", {
                    required: "This field is required",
                  })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
