import { axiosAuth } from "@/lib/axios";

export const OutletDelete = (id) => {
  return axiosAuth.delete("/outlets/delete/" + id);
};
