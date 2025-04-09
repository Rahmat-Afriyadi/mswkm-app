// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MasterRoles = async () => {
  const res = await axiosAuth.get("/roles/master-data/all");

  if (res.status == 200) {
    return res.data.data;
  } else {
    return [{ id: "", name: "" }];
  }
};
