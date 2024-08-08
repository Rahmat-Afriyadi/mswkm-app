import axios from "@/lib/axios";

export const generateNewOtp = (data) => {
  return axios.post("/auth/generate-new-otp", data);
};
