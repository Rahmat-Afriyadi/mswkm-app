import { axiosAuth } from "@/lib/axios";

export const PicMroDetail = (id) => {
  return axiosAuth.get("/pic-mros/detail/" + id);
};
