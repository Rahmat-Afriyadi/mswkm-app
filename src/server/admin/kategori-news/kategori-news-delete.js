import { axiosAuth } from "@/lib/axios";

export const KategoriNewsDelete = (id) => {
  return axiosAuth.delete("/news-kategoris/delete/" + id);
};
