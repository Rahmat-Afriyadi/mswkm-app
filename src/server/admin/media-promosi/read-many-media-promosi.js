// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const readManyMediaPromosi = async (query) => {
  const { pageParams, limit, search, mediaPromosi } = query;
  const data = await axiosAuth.get("/media-promosis/master-data", {
    params: { search, mediaPromosi, pageParams, limit },
  });
  const count = await axiosAuth.get("/media-promosis/master-data/count", { params: { search, pageParams, limit } });
  const res = { data: [], count: 0 };

  if (data.status == 200) {
    res.data = data.data;
  }
  if (count.status == 200) {
    res.count = count.data;
  }
  return res;
};
