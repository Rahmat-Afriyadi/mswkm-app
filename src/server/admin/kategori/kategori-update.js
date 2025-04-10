import { axiosAuth } from "@/lib/axios";

export const KategoriUpdate = (data) => {
  return axiosAuth.post("/kategoris/update-kategori", data);
};
