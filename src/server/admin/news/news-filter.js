// import { axiosAuth } from "@/lib/axios";
import axios from "@/lib/axios";

export const NewsFilter = async (query) => {
  const { pageParams, limit, search, kategori } = query;
  const data = await axios.get("/news/master-data/filter", {
    params: { search, kategori, pageParams, limit },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
