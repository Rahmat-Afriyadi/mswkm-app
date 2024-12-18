"use client";

import React from "react";
import PageFrame from "./page-frame";
import { useQuery } from "@tanstack/react-query";
import { MerchantDetail } from "@/server/admin/merchant/merchant-detail";
import { MerchantDetailFree } from "@/server/admin/merchant/merchant-detail-free";

export default function Page({ params }) {
  const { data: merchant, isLoading } = useQuery({
    queryKey: ["merchant-detail"],
    queryFn: async () => await MerchantDetailFree(params.id),
  });

  if (isLoading) {
    return "Loading....";
  }

  console.log("ini merchant yaa ", merchant);

  return (
    <>
      <PageFrame merchant={merchant.data} />
    </>
  );
}
