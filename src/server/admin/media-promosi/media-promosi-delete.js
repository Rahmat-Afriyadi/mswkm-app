import { axiosAuth } from "@/lib/axios";

export const MediaPromosiDelete = (id) => {
  return axiosAuth.delete("/media-promosis/delete/" + id);
};
