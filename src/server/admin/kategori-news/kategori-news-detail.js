import { axiosAuth } from "@/lib/axios";

export const KategoriNewsDetail = (id) => {
  return axiosAuth.get("/news-kategoris/detail/" + id);
};
