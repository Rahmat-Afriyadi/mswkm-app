import { axiosAuth } from "@/lib/axios";

export const BannerUpdate = (data) => {
  return axiosAuth.post("/banners/update-banner", data);
};
