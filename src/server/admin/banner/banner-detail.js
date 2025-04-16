import { axiosAuth } from "@/lib/axios";

export const BannerDetail = (id) => {
  return axiosAuth.get("/banners/detail/" + id);
};
