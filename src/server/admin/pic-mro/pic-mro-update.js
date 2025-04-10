import { axiosAuth } from "@/lib/axios";

export const PicMroUpdate = (data) => {
  return axiosAuth.post("/pic-mros/update-pic-mro", data);
};
