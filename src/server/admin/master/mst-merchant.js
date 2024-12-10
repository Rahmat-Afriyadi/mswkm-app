// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterMerchant = async () => {
  const res = await axiosAuth.get("/merchants/master-data/all");

  if (res.status == 200) {
    return res.data.data.map((e) => {
      return { id: e.id, name: e.nama };
    });
  } else {
    return [{ id: "", name: "" }];
  }
};
