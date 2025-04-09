import { axiosAuth } from "@/lib/axios";

export const RoleDetail = (id) => {
  return axiosAuth.get("/roles/detail/" + id);
};
