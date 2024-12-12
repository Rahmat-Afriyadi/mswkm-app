"use client";

import Card from "@/components/ui/merchant/card";
import Kategori from "@/components/ui/merchant/kategori";
import { merchantFilter } from "@/server/admin/merchant/merchant-filter";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame() {
  const searchParams = useSearchParams();
  const { data: merchant, isLoading } = useQuery({
    queryKey: ["master-merchant", searchParams.get("kategori")],
    queryFn: async () =>
      await merchantFilter({ pageParams: 1, search: "", kategori: searchParams.get("kategori"), limit: 100 }),
    initialData: { data: [{ id: "", nama: "", logo: "" }] },
  });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-3/4">
          <Kategori />
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-12 lg:grid-cols-10 gap-10 w-3/4">
          {merchant.data.map((e) => {
            return (
              <a
                href={"/merchant/detail/" + e.id}
                className="col-span-6 md:col-span-4 lg:col-span-2 rounded-md mb-2"
                key={e.id + " merchant-display"}
              >
                <Card title={e.nama} logo={e.logo} alamat={""} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
