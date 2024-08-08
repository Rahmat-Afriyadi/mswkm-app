"use client";

import axios from "../axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refresh_token: session?.user.refreshToken,
    });
    if (session) session.user.accessToken = res.refresh_token;
  };

  return refreshToken;
};
