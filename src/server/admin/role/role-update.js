import { axiosAuth } from "@/lib/axios";

export const RoleUpdate = (data) => {
  return axiosAuth.post("/roles/update-role", data);
};
