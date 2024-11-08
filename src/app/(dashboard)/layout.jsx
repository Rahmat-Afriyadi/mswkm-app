"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AutoLogoutProvider from "@/components/providers/auto-logout-provider";

export default function MainLayout({ children }) {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  return (
    <>
      <AutoLogoutProvider />
      {children}
    </>
  );
}
