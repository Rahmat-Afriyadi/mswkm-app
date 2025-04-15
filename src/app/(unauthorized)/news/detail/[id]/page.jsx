"use client";

import React from "react";
import PageFrame from "./page-frame";
import { useQuery } from "@tanstack/react-query";
import { NewsDetailFree } from "@/server/admin/news/news-detail-free";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const { data: news, isLoading } = useQuery({
    queryKey: ["news-detail"],
    queryFn: async () =>
      await NewsDetailFree({ id: params.id, lokasi: searchParams.get("lokasi") ? searchParams.get("lokasi") : "" }),
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
      <PageFrame news={news.data} />
    </>
  );
}
