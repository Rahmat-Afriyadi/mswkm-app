import { axiosAuth } from "@/lib/axios";

export const MediaPromosiUpdate = (data) => {
  return axiosAuth.post("/media-promosis/update-media-promosi", data);
};
