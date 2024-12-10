import React, { useEffect, useState } from "react";
import { UploadImageProfile } from "@/server/profile/upload-image-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function FormFile({ name, setValue, defaultValues = "" }) {
  const [imageProfile, setImageProfile] = useState(defaultValues);
  const imageProfileMut = useMutation({
    mutationFn: UploadImageProfile,
  });
  const queryCLient = useQueryClient();

  useEffect(() => {
    setValue(name, imageProfile);
  }, [imageProfile]); // eslint-disable-line

  return (
    <div className="w-full flex justify-center cursor-pointer">
      <label
        htmlFor="profile_image"
        className="w-20 h-20 md:w-40 md:h-40 bg-cover bg-center rounded-full md:mt-2 cursor-pointer"
        style={{
          backgroundImage: `url('${
            imageProfile == "" ? "/images/content/profile/Photo.png" : BASE_URL + imageProfile
          }')`,
        }}
      ></label>
      <input
        type="file"
        id="profile_image"
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
