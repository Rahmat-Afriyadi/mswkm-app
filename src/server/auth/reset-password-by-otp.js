import axios from "@/lib/axios";

export const resetPasswordByOtp = (data) => {
  return axios.post("/auth/reset-password-by-otp", data);
};
