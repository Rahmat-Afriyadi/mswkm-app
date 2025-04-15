import { axiosAuth } from "@/lib/axios";

export const KategoriNewsAdd = (data) => {
  return axiosAuth.post("/news-kategoris/create-news-kategoris", data);
};
