import { axiosAuth } from "@/lib/axios";

export const UserUpdate = (data) => {
  return axiosAuth.post("/userses/update-user", data);
};
