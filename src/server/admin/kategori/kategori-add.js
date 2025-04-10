import { axiosAuth } from "@/lib/axios";

export const KategoriAdd = (data) => {
  return axiosAuth.post("/kategoris/create-kategori", data);
};
