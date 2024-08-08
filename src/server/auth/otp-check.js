import axios from "@/lib/axios";

export const checkOtp = (data) => {
  return axios.post("/auth/check-otp", data);
};
