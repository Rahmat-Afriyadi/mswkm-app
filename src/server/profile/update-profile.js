import { axiosAuth } from "@/lib/axios";

export const updateProfile = (data) => {
  return axiosAuth.post("/profile/update/profile-data", data);
};
