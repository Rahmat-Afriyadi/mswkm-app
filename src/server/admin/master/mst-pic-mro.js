// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterPicMro = async () => {
  const res = await axiosAuth.get("/master-data/pic-mro");
  if (res.status == 200) {
    return res.data.data;
  } else {
    return [{ id: "", name: "" }];
  }
};
