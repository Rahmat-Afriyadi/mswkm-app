// import { axiosAuth } from "@/lib/axios";
import axios from "@/lib/axios";

export const newsSearch = async (query) => {
  const { search } = query;
  const data = await axios.get("/news/master-data/search", {
    params: { search },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
