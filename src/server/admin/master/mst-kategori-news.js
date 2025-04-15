// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterKategoriNews = async () => {
  const res = await axiosAuth.get("/master-data/kategori-news");
  if (res.status == 200) {
    return res.data.data;
  } else {
    return [{ id: "", name: "" }];
  }
};
