// import { axiosAuth } from "@/lib/axios";
import axios from "@/lib/axios";

export const BannerFilter = async (query) => {
  const { pageParams, limit, search, kategori, lokasi } = query;
  const data = await axios.get("/banners/master-data/filter", {
    params: { search, kategori, lokasi, pageParams, limit },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
