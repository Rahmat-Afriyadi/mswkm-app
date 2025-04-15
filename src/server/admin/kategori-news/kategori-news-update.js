import { axiosAuth } from "@/lib/axios";

export const KategoriNewsUpdate = (data) => {
  return axiosAuth.post("/news-kategoris/update-news-kategoris", data);
};
