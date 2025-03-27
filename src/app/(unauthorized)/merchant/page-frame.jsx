"use client";

import Card from "@/components/ui/merchant/card";
import { MerchantFilter } from "@/server/admin/merchant/merchant-filter";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Drawer from "@/components/drawer/drawer";
import FilterMerchant from "@/components/ui/merchant/filter-merchant";
import Search from "@/components/organism/search/search-merchant";
import { ClipLoader } from "react-spinners";

export default function PageFrame() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { data: merchant, isLoading: isLoading } = useQuery({
    queryKey: ["master-merchant", searchParams.get("kategori"), searchParams.get("lokasi")],
    queryFn: async () =>
      await MerchantFilter({
        pageParams: 1,
        search: "",
        kategori: searchParams.get("kategori"),
        lokasi: searchParams.get("lokasi"),
        limit: 100,
      }),
    initialData: { data: [{ id: "start-merchant", nama: "", logo: "" }] },
    refetchOnWindowFocus: false,
  });

  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams.get("search")) {
      const params = new URLSearchParams(searchParams);
      params.set("kategori", ""); // Set default ke empty string
      replace(`${pathname}?${params}`);
    }
  }, [searchParams]); // eslint-disable-line

  return (
    <>
      <div className="w-full flex justify-center mt-3">
        <div className="w-10/12 lg:w-3/4 relative">
          <div
            onClick={() => setOpen(true)}
            className="absolute left-0 w-max h-auto px-3 py-2 z-10 max-h-12 rounded-md bg-slate-100 hover:bg-slate-700 hover:text-red-400 cursor-pointer "
          >
            <AdjustmentsVerticalIcon className="h-8 w-8 " />
          </div>
          <div className="w-full h-auto absolute">
            <Search />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-10 w-10/12 lg:w-3/4">
          {!isLoading && merchant.data[0]?.logo != "" ? (
            merchant.data.map((e) => {
              return (
                <a
                  href={"/merchant/detail/" + e.id + `?${params.toString()}`}
                  className="col-span-1 rounded-md mb-2"
                  key={e.id + " merchant-display"}
                >
                  <Card title={e.nama} logo={e.logo} alamat={""} />
                </a>
              );
            })
          ) : (
            <div className="col-span-5">
              <div className="w-full flex h-screen flex-col items-center justify-center">
                <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5, marginTop: -50 }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <FilterMerchant setOpen={setOpen} />
      </Drawer>
    </>
  );
}
