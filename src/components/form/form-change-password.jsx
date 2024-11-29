"use client";

import { useRef, useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import InputGroup from "@/components/form/input/input-group";
import Button from "@/components/form/input/button";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function FormChangePassword({ setOpen }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange", // Enables real-time validation
  });

  const changePasswordMut = useMutation({
    mutationFn: (data) => console.log(data),
  });

  const password = useRef({});
  password.current = watch("new_password", "");

  const onSubmit = async (values) => {
    values.email = session?.user.email;
    setLoading(true);
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        changePasswordMut.mutate(values, {
          onSuccess: (data) => {
            Swal.fire("Success!", "Password successfully changed", "info");
            setLoading(false);
          },
          onError: (e) => {
            console.log("ini error ", e);
            Swal.fire("Failed!", e.message, "error");
            setLoading(false);
          },
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl"
      >
        <div className="flex-1 h-0 overflow-y-auto">
          <div className="px-4 py-6 bg-gray-50 sm:px-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Change Password</DialogTitle>
              <div className="flex items-center ml-3 h-7">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative text-gray-400 rounded-md hover:text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                Get started by filling in the information below to create your new password.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="px-4 divide-y divide-gray-200 sm:px-6">
              <div className="pt-6 pb-5 space-y-6">
                <div>
                  <InputGroup
                    label="Current Password"
                    id="password"
                    name="password"
                    type="password"
                    register={register}
                    validation={{ required: "This field is required" }}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputGroup
                    label="New Password"
                    id="new_password"
                    name="new_password"
                    type="password"
                    register={register}
                    validation={{
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    }}
                    errors={errors}
                  />
                </div>
                <div>
                  <InputGroup
                    label="Confirm Password"
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    register={register}
                    validation={{
                      validate: (value) => value === password.current || "The passwords do not match",
                    }}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end flex-shrink-0 px-4 py-4 gap-x-4">
          <Button label="Cancel" type="button" theme="secondary" onClick={() => setOpen(false)} />
          <Button label="Save" type="submit" disabled={loading} />
        </div>
      </form>
    </>
  );
}

export default FormChangePassword;
