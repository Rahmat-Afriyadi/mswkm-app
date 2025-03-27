// import { axiosAuth } from "@/lib/axios";
import axios from "@/lib/axios";

export const merchantSearch = async (query) => {
  const { search } = query;
  const data = await axios.get("/merchants/master-data/search", {
    params: { search },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
