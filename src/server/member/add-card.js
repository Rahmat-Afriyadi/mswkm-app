import { axiosAuth } from "@/lib/axios";

export const addCard = (data) => {
  return axiosAuth.post("/member/add-card", data);
};
