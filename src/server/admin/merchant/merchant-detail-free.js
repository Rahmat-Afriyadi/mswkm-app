import { axiosAuth } from "@/lib/axios";

export const MerchantDetailFree = (id) => {
  return axiosAuth.get("/merchants/detail/free/" + id);
};
