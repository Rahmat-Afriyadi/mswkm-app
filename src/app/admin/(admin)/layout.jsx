"use client";
import { Suspense, useEffect, useState } from "react";
// import Header from "../../components/organisms/header/header";
import Header from "@/components/organism/header/header-admin";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import AutoLogoutProvider from "@/components/providers/auto-logout-provider";
import Sidebars from "@/components/organism/sidebar/sidebars";
import userRoles from "@/data/user-roles";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rolePrivileges, setRolePrivileges] = useState();

  const segment = useSelectedLayoutSegment();
  const router = useRouter();

  const { data: session, status } = useSession();
  const role = session?.user?.is_admin ? "Administrator" : "User";

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn(segment ? segment : "");
    } else if (status === "authenticated" && session?.user.password_change_counter == 0) {
      router.push("/account/change-password-counter");
    }

    if (role) {
      setRolePrivileges(userRoles[role]);
    }
  }, [role, router, segment, session, status]);

  return (
    <>
      <div>
        <Sidebars sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="lg:pl-72">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {rolePrivileges && !rolePrivileges.canAccess.includes(segment) ? (
                <p>You do not have access to this page</p>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
