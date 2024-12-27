"use client";

import PageFrame from "./page-frame";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileMe } from "@/server/profile/me";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: me,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile-me"],
    queryFn: ProfileMe,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    if (error.message == "Unauthorized") {
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
    }
  }

  return (
    <>
      <div className="w-full bg-[#54565a]">
        <div
          className="w-full flex flex-col items-center bg-cover bg-center"
          style={{ backgroundImage: `url('${BASE_URL}/uploads/BG.PNG')` }}
        >
          <div className="w-9/12 h-3 mt-2">
            <div className="w-full text-center text-white font-bold text-xl">Profile</div>
          </div>
          <br />
          <div className="w-11/12 bg-white h-[2px] rounded-lg"></div>
          <br />
          <PageFrame defaultValues={me.data.data} />
        </div>

        <div className="w-full h-auto -bottom-16">
          {windowWidth < 641 && (
            <Image
              src={"/images/content/footer/Footer.png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {windowWidth > 640 && (
            <Image
              src={"/images/content/footer/Footer-lg.png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </>
  );
}
