import { axiosAuth } from "@/lib/axios";

export const BannerHomePin = async () => {
  const data = await axiosAuth.get("/banners/master-data/pin");
  if (data.status == 200) {
    if (data.data.length > 0) {
      return data.data;
    }
  }
  return [{ id: "", banner: "" }];
};
