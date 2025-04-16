import { axiosAuth } from "@/lib/axios";

export const BannerDelete = (id) => {
  return axiosAuth.delete("/banners/delete/" + id);
};
