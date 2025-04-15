import { axiosAuth } from "@/lib/axios";

export const NewsDelete = (id) => {
  return axiosAuth.delete("/news/delete/" + id);
};
