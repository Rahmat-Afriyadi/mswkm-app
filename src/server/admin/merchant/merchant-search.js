// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const merchantSearch = async (query) => {
  const { search } = query;
  const data = await axiosAuth.get("/merchants/master-data/search", {
    params: { search },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  console.log("ini res yaa ", res);
  return res;
};
