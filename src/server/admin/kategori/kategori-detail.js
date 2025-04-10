import { axiosAuth } from "@/lib/axios";

export const KategoriDetail = (id) => {
  return axiosAuth.get("/kategoris/detail/" + id);
};
