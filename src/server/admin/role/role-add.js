import { axiosAuth } from "@/lib/axios";

export const RoleAdd = (data) => {
  return axiosAuth.post("/roles/create-role", data);
};
