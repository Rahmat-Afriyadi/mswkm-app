"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { merchantSearch } from "@/server/admin/merchant/merchant-search";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [seearchBox, setSearchBox] = useState(false);
  const router = useRouter();

  const { data: merchant, isLoading } = useQuery({
    queryKey: ["master-merchant-search", searchInput],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await merchantSearch({
        search: searchInput,
      }),
    initialData: { data: [{ id: "start-search", nama: "" }] },
  });

  if (isLoading) {
    return "loading";
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <input
            onFocus={(e) => setSearchBox(true)}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={() => setSearchBox(false)}
            placeholder="search"
            type="text"
            className={`w-3/4 ${
              !seearchBox ? "rounded-xl" : "rounded-t-xl"
            } bg-slate-100 text-black border-0 focus:ring-0 focus:border-none outline-none focus:outline-none text-center h-12`}
          />
        </div>
        <div className="h-auto">
          <div className="mx-auto w-3/4 max-h-72 z-0 bg-slate-100 -mt-3 rounded-b-xl pt-2 pr-5">
            {!isLoading && searchInput.length > 0 && merchant && (
              <p
                onClick={() => router.push("/merchant/detail/" + merchant.data[0]?.id)}
                className="bg-slate-300 cursor-pointer text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full border-l-4 border-l-cyan-400"
              >
                {merchant.data[0]?.nama}
              </p>
            )}
            {!isLoading &&
              searchInput.length > 0 &&
              merchant &&
              merchant.data.slice(1).map((e) => {
                return (
                  <>
                    <p
                      key={e.id + " search"}
                      onClick={() => router.push("/merchant/detail/" + e.id)}
                      className="text-lg py-1 px-5 hover:bg-slate-300 rounded-r-full cursor-pointer"
                    >
                      {e.nama}
                    </p>
                  </>
                );
              })}
            {/* <p className="text-lg py-1 px-5 hover:bg-slate-300 rounded-r-full">Lorem Lorem Lorem</p> */}
            {/* <p className="text-lg py-1 px-5 hover:bg-slate-300 rounded-r-full">Lorem Lorem Lorem</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
