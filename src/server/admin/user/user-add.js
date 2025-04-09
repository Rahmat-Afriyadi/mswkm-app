import { axiosAuth } from "@/lib/axios";

export const UserAdd = (data) => {
  return axiosAuth.post("/userses/create-user", data);
};
