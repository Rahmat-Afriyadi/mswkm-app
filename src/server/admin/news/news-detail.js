import { axiosAuth } from "@/lib/axios";

export const NewsDetail = (id) => {
  return axiosAuth.get("/news/detail/" + id);
};
