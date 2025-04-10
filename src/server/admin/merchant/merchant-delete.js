import { axiosAuth } from "@/lib/axios";

export const MerchantDelete = (id) => {
  return axiosAuth.delete("/merchants/delete/" + id);
};
