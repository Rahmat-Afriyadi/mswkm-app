import MultipleCheckbox from "@/components/form/input/mutiple-checkbox";
import { MasterKategoriNews } from "@/server/admin/master/mst-kategori-news";
import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FilterNews({ setOpen }) {
  const [selectedKategori, setSelectedKategori] = useState([]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSelection = (option, name) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, option);
    replace(`${pathname}?${params}`);
  };

  const { data: kategori } = useQuery({
    queryKey: ["master-kategori-news"],
    queryFn: async () => await MasterKategoriNews(),
    initialData: [{ value: "" }],
  });

  useEffect(() => {
    return handleSelection(selectedKategori.join("w3"), "kategori");
  }, [selectedKategori]); // eslint-disable-line

  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
      <div className="px-4 py-6 bg-gray-50 sm:px-6">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Filter News</DialogTitle>
          <div className="flex items-center ml-3 h-7">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative text-gray-400 rounded-md hover:text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="absolute -inset-2.5" />
              <span className="sr-only">Close panel</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="w-full flex justify-center">
        <div className="w-11/12 px-2 py-1 bg-slate-50 rounded-md">
          <p className="text-lg font-semibold">Kategori</p>
          <MultipleCheckbox
            options={kategori.map((e) => ({ value: e.name }))}
            setState={setSelectedKategori}
            defaultValues={searchParams.get("kategori") ? searchParams.get("kategori").split("w3") : []}
          />
          <br />
          <hr className="border-[2px]" />
        </div>
      </div>
    </div>
  );
}
