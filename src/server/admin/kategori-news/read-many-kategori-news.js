// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const readManyKategoriNews = async (query) => {
  const { pageParams, limit, search, kategori } = query;
  const data = await axiosAuth.get("/news-kategoris/master-data", { params: { search, kategori, pageParams, limit } });
  const count = await axiosAuth.get("/news-kategoris/master-data/count", { params: { search, pageParams, limit } });
  const res = { data: [], count: 0 };

  if (data.status == 200) {
    res.data = data.data;
  }
  if (count.status == 200) {
    res.count = count.data;
  }
  return res;
};
