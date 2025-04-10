import { axiosAuth } from "@/lib/axios";

export const MediaPromosiAdd = (data) => {
  return axiosAuth.post("/media-promosis/create-media-promosi", data);
};
