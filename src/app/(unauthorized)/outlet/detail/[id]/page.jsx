"use client";

import React from "react";
import PageFrame from "./page-frame";
import { useQuery } from "@tanstack/react-query";
import { OutletDetailFree } from "@/server/admin/outlet/outlet-detail-free";

export default function Page({ params }) {
  const { data: outlet, isLoading } = useQuery({
    queryKey: ["outlet-detail"],
    queryFn: async () => await OutletDetailFree(params.id),
  });

  if (isLoading) {
    return "Loading....";
  }
  console.log("ini data ", outlet.data);

  return (
    <>
      <PageFrame outlet={outlet.data} />
    </>
  );
}
