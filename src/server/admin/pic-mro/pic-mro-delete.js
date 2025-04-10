import { axiosAuth } from "@/lib/axios";

export const PicMroDelete = (id) => {
  return axiosAuth.delete("/pic-mros/delete/" + id);
};
