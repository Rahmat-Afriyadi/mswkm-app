"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function AutoLogoutProvider() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "authenticated" || status == "loading") {
      if (session?.user.refreshToken != undefined) {
        fetch(BASE_URL + "/auth/refresh-token", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          method: "POST",
          body: JSON.stringify({
            refresh_token: session?.user.refreshToken,
          }),
        })
          .then(() => {
            // success refresh
          })
          .catch((error) => {
            signOut({ redirect: false }).then(() => {
              void signIn();
            });
          });
      }
    } else {
      signOut({ redirect: false });
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps
}
