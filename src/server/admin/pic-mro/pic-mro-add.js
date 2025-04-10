import { axiosAuth } from "@/lib/axios";

export const PicMroAdd = (data) => {
  return axiosAuth.post("/pic-mros/create-pic-mro", data);
};
