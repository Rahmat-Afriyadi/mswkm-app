import { axiosAuth } from "@/lib/axios";

export const MerchantUpdate = (data) => {
  return axiosAuth.post("/merchants/update-merchant", data);
};
