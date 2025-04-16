import { axiosAuth } from "@/lib/axios";

export const BannerAdd = (data) => {
  return axiosAuth.post("/banners/create-banner", data);
};
