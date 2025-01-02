"use client";

import React from "react";
import PageFrame from "./page-frame";
import { useQuery } from "@tanstack/react-query";
import { OutletDetailFree } from "@/server/admin/outlet/outlet-detail-free";
import { ClipLoader } from "react-spinners";

export default function Page({ params }) {
  const { data: outlet, isLoading } = useQuery({
    queryKey: ["outlet-detail"],
    queryFn: async () => await OutletDetailFree(params.id),
  });
  if (isLoading) {
    return (
      <div className="w-full ">
        <div className="w-full flex flex-col items-center bg-cover bg-center h-screen justify-center">
          <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5 }} />
        </div>
      </div>
    );
  }

  return (
    <>
      <PageFrame outlet={outlet.data} />
    </>
  );
}
