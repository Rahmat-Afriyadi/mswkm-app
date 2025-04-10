import { axiosAuth } from "@/lib/axios";

export const KategoriDelete = (id) => {
  return axiosAuth.delete("/kategoris/delete/" + id);
};
