import { axiosAuth } from "@/lib/axios";

export const UserDelete = (id) => {
  return axiosAuth.delete("/users/delete/" + id);
};
