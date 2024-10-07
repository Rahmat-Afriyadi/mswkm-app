// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const UploadImageProfile = (formData) => {
  return axiosAuth.post("/profile/upload/image-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
