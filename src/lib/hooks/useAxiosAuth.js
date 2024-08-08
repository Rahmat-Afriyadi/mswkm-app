"use client";

import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import config from "../../../postcss.config.mjs";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (conf) => {
        if (!conf.headers["Authorization"]) {
          conf.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
        }
        return conf;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status == 401) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(prevRequest);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  return axiosAuth;
};

export default useAxiosAuth;
