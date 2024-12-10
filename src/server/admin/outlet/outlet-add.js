import { axiosAuth } from "@/lib/axios";

export const OutletAdd = (data) => {
  return axiosAuth.post("/outlets/create-outlet", data);
};
