"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/server/auth/signin";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {  useRouter,useSearchParams } from "next/navigation";
import { generateNewOtp } from "@/server/auth/generate-new-otp";
import { checkOtpReset } from "@/server/auth/otp-check";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("")
  const [noHp, setNohp] = useState(null);
  const router = useRouter()
  const [otp, setOtp] = useState("");
  const {data:session} = useSession()
  const [counter, setCounter] = useState(0);
  const searchParams = useSearchParams();


  const mutCheckOtp = useMutation({
    mutationFn: checkOtpReset,
  });
  const mutGenerateOtp = useMutation({
    mutationFn: generateNewOtp,
  });

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (noHp != null) {
    return (
      <div className="flex flex-col h-screen justify-center items-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:w-full md:w-[500px] mx-auto shadow-lg bg-slate-50 rounded-lg p-4">
          <br />
          <div className="flex justify-center w-full">
            <OTPInput
              value={otp}
              onChange={(e) => {
                setOtp(e);
                if (e.length > 5) {
                  mutCheckOtp.mutate(
                    { no_hp: noHp, otp: parseInt(e) },
                    {
                      onSuccess: (data) => {
                        console.log("ini data ", data)
                       router.push("/reset-password?zxcvb=" + data.data.otp.id )
                      },
                      onError: (e) => {
                        setOtp("");
                        Swal.fire("Failed!", e.response.data.message, "error");
                      },
                    }
                  );
                }
              }}
              numInputs={6}
              renderSeparator={<span className="px-2 font-bold">o</span>}
              inputStyle={{
                borderRadius: "5px",
                color: "black",
                fontSize: "40px",
                width: "55px",
              }}
              inputType="tel"
              renderInput={(props) => <input style={"color:black;"} {...props} />}
            />
          </div>
          <br />
          <div className="flex justify-center">
            {counter > 0 && (
              <p className="text-center text-sm text-red-500">
                Kode OTP telah dikirim ke nomor telepon anda. Jika Anda tidak menerima kode OTP silahkan generate OTP
                dalam {counter} Detik
              </p>
            )}
          </div>
          <br />
          <div className="flex justify-center">
            <button onClick={() => setOtp("")} className="px-4 py-1 bg-red-500 rounded-md text-white mr-4 text-lg">
              Clear
            </button>
            <button
              onClick={() => {
                setCounter(5);
                mutGenerateOtp.mutate(
                  { no_hp: noHp },
                  {
                    onSuccess: (data) => {
                      console.log("berhasil generate data ", data);
                    },
                    onError: (e) => {
                      console.log("error generate ", e);
                    },
                  }
                );
              }}
              className={`px-4 py-1 ${counter > 0 ? "bg-gray-500" : "bg-blue-500"} rounded-md text-white text-lg`}
              disabled={counter > 0}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    );
  }


  const onSubmit = async (data) => {
    console.log("ini data yaa ", data)
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutGenerateOtp.mutate(data, {
          onSuccess: (data) => {
            setNohp(data.data.user.no_hp);
          },
          onError: (e) => {
            console.log("ini error ", e.response);
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
            Forgot Password
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          {message != "" && <div className="text-center bg-red rounded-lg text-white py-1 ">{message}</div>}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="no_hp" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="no_hp"
                  name="no_hp"
                  type="text"
                  autoComplete="no_hp"
                  {...register("no_hp", {
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
