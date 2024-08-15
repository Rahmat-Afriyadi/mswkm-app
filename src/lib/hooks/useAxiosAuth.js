import { axiosAuth } from "@/lib/axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

// export const useAxiosAuth = () => {
//   axiosAuth.interceptors.request.use(
//     async (conf) => {
//       const session = await getSession();
//       console.log("ini masuk interceptor gk sih", session);
//       if (!conf.headers["Authorization"]) {
//         conf.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
//       }
//       return conf;
//     },
//     (error) => Promise.reject(error)
//   );

//   axiosAuth.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       console.log("refresh kesini gk sih ", error);
//       const prevRequest = error.config;
//       if (!prevRequest.sent) {
//         prevRequest.sent = true;
//         const newTokenRes = await fetch("/api/refresh");
//         const newToken = await newTokenRes.json();
//         prevRequest.headers["Authorization"] = `Bearer ${newToken?.access_token}`;
//         return axiosAuth(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosAuth;
// };

// export const useAxiosAuth = () => {
//   const { data: session } = useSession();
//   // const refreshToken = useRefreshToken();

//   useEffect(() => {
//     const requestIntercept = axiosAuth.interceptors.request.use(
//       (conf) => {
//         if (!conf.headers["Authorization"]) {
//           conf.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
//         }
//         return conf;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = axiosAuth.interceptors.response.use(
//       (res) => res,
//       async (error) => {
//         const prevRequest = error.config;
//         if (error.response.status == 401 && !prevRequest.sent) {
//           prevRequest.sent = true;
//           // await refreshToken();
//           prevRequest.headers["Access-Control-Allow-Credentials"] = true;
//           prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
//           return axiosAuth(prevRequest);
//         }
//         return Promise.reject(prevRequest);
//       }
//     );

//     return () => {
//       axiosAuth.interceptors.request.eject(requestIntercept);
//       axiosAuth.interceptors.response.eject(responseIntercept);
//     };
//   }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

//   return axiosAuth;
// };
