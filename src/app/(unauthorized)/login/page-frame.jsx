"use client";

import { useForm } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/server/auth/signin";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateNewOtp } from "@/server/auth/generate-new-otp";
import { checkOtp } from "@/server/auth/otp-check";

export default function Page() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [noHp, setNohp] = useState(null);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { data: session, status, update } = useSession();
  const [counter, setCounter] = useState(0);
  const searchParams = useSearchParams();

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (status == "authenticated") {
      // signOut({ redirect: false }).then();
      if (session?.user?.is_admin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/card");
      }
    }
  }, [status]); // eslint-disable-line

  const mutCheckOtp = useMutation({
    mutationFn: checkOtp,
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
                      onSuccess: async (data) => {
                        const result = await signIn("credentials", {
                          redirect: false,
                          username: noHp,
                          password: "",
                          auto_login: true,
                          isAdmin: false,
                          isActivation: false,
                        });
                        if (!result?.ok) {
                          if (result?.error == "inactive") {
                            // akun anda belum aktif, apakah anda ingin mengulang OTP?
                            await Swal.fire({
                              title: "Akun anda belum aktif, apakah anda ingin mengirim ulang OTP?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonColor: "#0891B2",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Tentu Saja!",
                              showLoaderOnConfirm: true,
                              preConfirm: () => {
                                setNohp(data.username);
                              },
                              allowOutsideClick: () => !Swal.isLoading(),
                            });
                            return;
                          } else if (result?.error == "fail") {
                            setMessage(result?.error);
                            return;
                          } else {
                            return await Swal.fire({
                              title: "Selamat akun anda telah aktif. Silahkan Login!",
                              icon: "success",
                              confirmButtonColor: "#0891B2",
                              confirmButtonText: "Oke",
                              showLoaderOnConfirm: true,
                              preConfirm: () => {
                                setNohp(null);
                                router.push(
                                  searchParams.get("callbackUrl") ? searchParams?.get("callbackUrl") : "/profile"
                                );
                              },
                              allowOutsideClick: () => !Swal.isLoading(),
                            });
                          }
                        }
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
              renderSeparator={<span className="px-1 lg:px-2 font-bold">o</span>}
              inputStyle={{
                borderRadius: "5px",
                color: "black",
                fontSize: width < 515 ? "20px" : "40px",
                width: width < 515 ? "30px" : "55px",
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
                setCounter(120);
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
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      auto_login: false,
      isAdmin: false,
      isActivation: false,
    });
    if (!result?.ok) {
      if (result?.error == "inactive") {
        // akun anda belum aktif, apakah anda ingin mengulang OTP?
        Swal.fire({
          title: "Akun anda belum aktif, apakah anda ingin mengirim ulang OTP?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#0891B2",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tentu Saja!",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            setNohp(data.username);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
        return;
      } else if (result?.error == "fail") {
        setMessage(result?.error);
        return;
      }
      return;
    }
    router.push(searchParams.get("callbackUrl") ? searchParams?.get("callbackUrl") : "/profile");
  };

  return (
    <div className="flex flex-col h-screen justify-center flex-1 min-h-full px-6 py-12 lg:px-8 ">
      <div className="sm:w-full md:w-[500px] mx-auto shadow-lg bg-slate-50 rounded-lg p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign In To Your Account
          </h2>
        </div>

        {message != "" && <div className="text-center bg-red rounded-lg text-red-600 py-1 font-bold">{message}</div>}
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  {...register("username", {
                    required: "This field is required",
                  })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
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
                Sign in
              </button>
              <br />
              <div className="flex justify-center">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
              <br />
              <br />
              <div className="grid grid-cols-12">
                <div className="col-span-7 flex items-center">
                  <p className="font-semibold text-lg">Dont Have an Account ?</p>
                </div>
                <a
                  href="/signup"
                  className="col-span-5 bg-indigo-600 rounded-lg py-2 text-white text-center cursor-pointer"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
