import { axiosAuth } from "@/lib/axios";

export const OutletUpdate = (data) => {
  return axiosAuth.post("/outlets/update-outlet", data);
};
