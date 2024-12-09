// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterKategori = async () => {
  const res = await axiosAuth.get("/master-data/kategori-merchant");
  if (res.status == 200) {
    return res.data.data;
  } else {
    return [{ id: "", name: "" }];
  }
};
