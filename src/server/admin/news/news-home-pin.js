import { axiosAuth } from "@/lib/axios";

export const NewsHomePin = async () => {
  const data = await axiosAuth.get("/news/master-data/pin");
  if (data.status == 200) {
    if (data.data.length > 0) {
      return data.data;
    }
  }
  return [{ id: "", banner: "" }];
};
