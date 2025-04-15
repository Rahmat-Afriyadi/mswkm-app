import { axiosAuth } from "@/lib/axios";

export const NewsAdd = (data) => {
  return axiosAuth.post("/news/create-news", data);
};
