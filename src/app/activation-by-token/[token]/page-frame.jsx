"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/server/auth/signin";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateNewOtp } from "@/server/auth/generate-new-otp";
import { checkOtp } from "@/server/auth/otp-check";

export default function Page({ defaultValues }) {
  const [message, setMessage] = useState("");
  const [noHp, setNohp] = useState(defaultValues.no_hp);
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { data: session, status, update } = useSession();
  const [counter, setCounter] = useState(0);
  const searchParams = useSearchParams();

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
                          username: noHp,
                          token: defaultValues.token,
                          isActivation: true,
                        });
                        if (!result?.ok) {
                          if (result?.error == "fail") {
                            setMessage(result?.error);
                            return;
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
  } else {
    return (
      <>
        <p className="font-bold text-xl">Maaf token tersebut tidak ditemukan atau telah expired</p>
      </>
    );
  }
}
