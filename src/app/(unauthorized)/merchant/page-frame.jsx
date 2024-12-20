"use client";

import FilterMultipleSelect from "@/components/form/input/filter-multiple-select";
import MultipleSelect from "@/components/form/input/multiple-select";
import Card from "@/components/ui/merchant/card";
import Kategori from "@/components/ui/merchant/kategori";
import { merchantFilter } from "@/server/admin/merchant/merchant-filter";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Drawer from "@/components/drawer/drawer";
import { DialogTitle } from "@headlessui/react";
import FilterMerchant from "@/components/ui/merchant/filter-merchant";
import Search from "@/components/organism/search/search-merchant";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { data: merchant, isLoading } = useQuery({
    queryKey: ["master-merchant", searchParams.get("kategori"), searchParams.get("lokasi")],
    queryFn: async () =>
      await merchantFilter({
        pageParams: 1,
        search: "",
        kategori: searchParams.get("kategori"),
        lokasi: searchParams.get("lokasi"),
        limit: 100,
      }),
    initialData: { data: [{ id: "", nama: "", logo: "" }] },
  });
  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <div className="w-full flex justify-center mt-3">
        <div className="w-3/4 relative">
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
        {/* <div className="w-3/4 grid grid-cols-12 gap-x-3">
          <div className="col-span-4">
            <FilterMultipleSelect
              label={"Kategori"}
              id={"Kategori"}
              optionsList={[{ id: "test", name: "name" }]}
              placeholder={"Kategori"}
              name={"kategori"}
              defaultValues={null}
            />
          </div>
          <div className="col-span-4">
            <FilterMultipleSelect
              label={"Lokasi"}
              id={"Lokasi"}
              optionsList={[{ id: "test", name: "name" }]}
              placeholder={"Lokasi"}
              name={"lokasi"}
              defaultValues={null}
            />
          </div>
        </div> */}
      </div>
      <br />
      <br />
      <br />
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-12 lg:grid-cols-10 gap-10 w-3/4">
          {merchant.data.map((e) => {
            return (
              <a
                href={"/merchant/detail/" + e.id + `?${params.toString()}`}
                className="col-span-6 md:col-span-4 lg:col-span-2 rounded-md mb-2"
                key={e.id + " merchant-display"}
              >
                <Card title={e.nama} logo={e.logo} alamat={""} />
              </a>
            );
          })}
        </div>
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <FilterMerchant setOpen={setOpen} />
      </Drawer>
    </>
  );
}
