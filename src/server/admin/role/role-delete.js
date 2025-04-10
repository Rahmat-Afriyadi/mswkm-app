import { axiosAuth } from "@/lib/axios";

export const RoleDelete = (id) => {
  return axiosAuth.delete("/roles/delete/" + id);
};
