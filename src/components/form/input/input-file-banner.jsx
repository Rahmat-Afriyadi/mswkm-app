import React, { useEffect, useState } from "react";
import { UploadImageProfile } from "@/server/profile/upload-image-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function FormFileBanner({ name, setValue, defaultValues = "", id }) {
  const [imageProfile, setImageProfile] = useState(defaultValues);
  const imageProfileMut = useMutation({
    mutationFn: UploadImageProfile,
  });
  const queryCLient = useQueryClient();

  useEffect(() => {
    setValue(name, imageProfile);
  }, [imageProfile]); // eslint-disable-line

  return (
    <div className="w-full flex justify-center cursor-pointer h-full">
      <label
        htmlFor={id}
        className="w-full bg-cover bg-center md:mt-2 cursor-pointer shadow-md aspect-[21/9]"
        style={{
          backgroundImage: `url('${
            imageProfile == "" ? "/images/content/default/banner 21-9.jpg" : BASE_URL + imageProfile
          }')`,
        }}
      ></label>
      <input
        type="file"
        id={id}
        className="hidden"
        onChange={(e) => {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          imageProfileMut.mutate(formData, {
            onSuccess: (data) => {
              queryCLient.invalidateQueries({ queryKey: ["merchant-update"] });
              setImageProfile(data.data.data);
            },
            onError: (e) => {
              console.log("ini error ", e);
            },
          });
        }}
      />
    </div>
  );
}
