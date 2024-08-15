// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const MemberCard = () => {
  return axiosAuth.get("/member/my-card");
};
