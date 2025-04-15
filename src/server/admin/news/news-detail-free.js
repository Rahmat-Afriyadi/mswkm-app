import { axiosAuth } from "@/lib/axios";

export const NewsDetailFree = ({ id, lokasi }) => {
  return axiosAuth.get("/news/detail/free/" + id, {
    params: { lokasi },
  });
};
