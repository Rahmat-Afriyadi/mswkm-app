import { axiosAuth } from "@/lib/axios";

export const NewsUpdate = (data) => {
  return axiosAuth.post("/news/update-news", data);
};
