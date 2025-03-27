// import { axiosAuth } from "@/lib/axios";
import axios from "@/lib/axios";

export const MerchantFilter = async (query) => {
  const { pageParams, limit, search, kategori, lokasi } = query;
  const data = await axios.get("/merchants/master-data/filter", {
    params: { search, kategori, lokasi, pageParams, limit },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
