import { axiosAuth } from "@/lib/axios";

export const MerchantAdd = (data) => {
  return axiosAuth.post("/merchants/create-merchant", data);
};
