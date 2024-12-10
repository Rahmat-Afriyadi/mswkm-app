import { axiosAuth } from "@/lib/axios";

export const OutletDetail = (id) => {
  return axiosAuth.get("/outlets/detail/" + id);
};
