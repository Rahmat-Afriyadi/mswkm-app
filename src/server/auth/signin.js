"use server";

import axios from "@/lib/axios";

export const login = async (data) => {
  return axios.post("/auth/login", data);
};
