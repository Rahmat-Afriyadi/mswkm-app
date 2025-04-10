import { axiosAuth } from "@/lib/axios";

export const MediaPromosiDetail = (id) => {
  return axiosAuth.get("/media-promosis/detail/" + id);
};
