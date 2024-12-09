// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterMediaPromosi = async () => {
  const res = await axiosAuth.get("/master-data/media-promosi");
  if (res.status == 200) {
    return res.data.data;
  } else {
    return [{ id: "", name: "" }];
  }
};
