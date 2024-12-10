// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const merchantFilter = async (query) => {
  const { pageParams, limit, search } = query;
  const data = await axiosAuth.get("/merchants/master-data", { params: { search, pageParams, limit } });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
