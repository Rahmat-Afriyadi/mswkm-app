"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function AutoLogoutProvider() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.user.refreshToken) {
      fetch("http://127.0.0.1:3001/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({
          refresh_token: session?.user.refreshToken,
        }),
      })
        .then((data) => {
          if (data.status == 401) {
            signOut({ redirect: false }).then(() => {
              void signIn();
            });
          }
        })
        .catch((error) => {
          console.log("ini error ", error);
        });
    } else {
      signOut({ redirect: false }).then(() => {
        void signIn();
      });
    }
  }, [session]);
}
