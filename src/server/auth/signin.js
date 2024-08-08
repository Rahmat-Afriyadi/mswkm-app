import axios from "@/lib/axios";

export const login = (data) => {
  return axios.post("/auth/login", data);
};
