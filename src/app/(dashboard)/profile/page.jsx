"use client";

import PageFrame from "./page-frame";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProfileMe } from "@/server/profile/me";

export default function Page() {
  const { data: session } = useSession();

  const { data: me, isLoading } = useQuery({
    queryKey: ["profile-me"],
    queryFn: ProfileMe,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <div className="w-full bg-[#54565a]">
        <div className="w-full flex flex-col items-center bg-[#54565a]">
          <div className="w-9/12 h-3 mt-2">
            <div className="w-full text-center text-white font-bold text-xl">Profile</div>
          </div>
          <br />
          <div className="w-11/12 bg-white h-[2px] rounded-lg"></div>
          <br />
          <PageFrame defaultValues={me.data.data} />
        </div>
      </div>
    </>
  );
}
