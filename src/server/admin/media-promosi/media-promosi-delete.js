import { axiosAuth } from "@/lib/axios";

export const MediaPromosiDelete = (id) => {
  return axiosAuth.delete("/media-promosi/delete/" + id);
};
