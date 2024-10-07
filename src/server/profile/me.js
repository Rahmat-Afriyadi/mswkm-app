// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const ProfileMe = () => {
  return axiosAuth.get("/profile/me");
};
