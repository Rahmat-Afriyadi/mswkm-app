import { axiosAuth } from "@/lib/axios";

export const UserDetail = (id) => {
  return axiosAuth.get("/userses/detail/" + id);
};
