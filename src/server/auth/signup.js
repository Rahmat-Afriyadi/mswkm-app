import axios from "@/lib/axios";

export const signup = (data) => {
  return axios.post("/auth/signup", data);
};
