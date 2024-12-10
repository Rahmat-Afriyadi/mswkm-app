import { axiosAuth } from "@/lib/axios";

export const MerchantDetail = (id) => {
  return axiosAuth.get("/merchants/detail/" + id);
};
