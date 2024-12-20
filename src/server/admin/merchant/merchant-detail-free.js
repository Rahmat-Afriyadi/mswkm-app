import { axiosAuth } from "@/lib/axios";

export const MerchantDetailFree = ({ id, lokasi }) => {
  return axiosAuth.get("/merchants/detail/free/" + id, {
    params: { lokasi },
  });
};
