import { axiosAuth } from "@/lib/axios";

export const OutletDetailFree = (id) => {
  return axiosAuth.get("/outlets/detail/free/" + id);
};
