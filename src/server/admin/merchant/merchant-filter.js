// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const merchantFilter = async (query) => {
  const { pageParams, limit, search, kategori } = query;
  const data = await axiosAuth.get("/merchants/master-data/filter", {
    params: { search, kategori, pageParams, limit },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
