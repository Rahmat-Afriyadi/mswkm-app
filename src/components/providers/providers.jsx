"use client";

import { SessionProvider } from "next-auth/react";
import AutoLogoutProvider from "./auto-logout-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Notification from "../organism/nontification/nontification";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Notification />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
