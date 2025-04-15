"use client";

import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/components/ui/news/card"), { ssr: false });
const Search = dynamic(() => import("@/components/organism/search/search-news"), { ssr: false });
import { NewsFilter } from "@/server/admin/news/news-filter";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Drawer from "@/components/drawer/drawer";
import FilterNews from "@/components/ui/news/filter-news";
import { ClipLoader } from "react-spinners";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pageParams = searchParams.get("pageParams") || 1;
  const { data: news, isLoading: isLoading } = useQuery({
    queryKey: ["master-news", searchParams.get("kategori"), searchParams.get("lokasi"), pageParams],
    queryFn: async () =>
      await NewsFilter({
        pageParams: pageParams,
        search: "",
        kategori: searchParams.get("kategori"),
        lokasi: searchParams.get("lokasi"),
        limit: 18,
      }),
    initialData: { data: [{ id: "start-news", nama: "", logo: "" }] },
    refetchOnWindowFocus: false,
  });

  const { replace } = useRouter();
  const pathname = usePathname();

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
      <div className="relative w-full flex justify-center py-8  min-h-[83vh]">
        {/* Tombol Kiri */}
        <button
          disabled={!pageParams || pageParams == 1}
          onClick={() => {
            if (pageParams) {
              const params = new URLSearchParams(searchParams);
              params.set("pageParams", parseInt(pageParams) - 1); // Set default ke empty string
              replace(`${pathname}?${params}`);
            }
          }}
          className="disabled:cursor-not-allowed text-slate-800 disabled:text-slate-200 hover:bg-slate-300 disabled:hover:bg-transparent absolute left-1 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 text-3xl font-bold rounded-full z-10"
        >
          <ArrowLeftCircleIcon
            aria-hidden="true"
            className={" group-hover:text-indigo-600 h-6 md:h-12 w-6 md:w-12 rounded-full shrink-0"}
          />
        </button>

        {/* Grid Isi */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-10/12 lg:w-3/4">
          {!isLoading && news.data[0]?.logo != "" ? (
            news.data.map((e) => {
              return (
                <a
                  className="flex items-start justify-center cursor-pointer col-span-1 shadow-md rounded-md h-[35vw] sm:h-[270px] md:h-[300px] xl:h-[375px]"
                  href={"/news/detail/" + e.id + `?${params.toString()}`}
                  key={e.id + " news-display"}
                >
                  <div className="h-[35vw] sm:h-[270px] md:h-[300px] xl:h-[375px] w-full p-1 lg:p-2 rounded-md flex flex-col justify-between">
                    <div className="w-full">
                      <div className="w-full aspect-video bg-red-400 rounded-md">
                        <Image
                          alt="slide_1"
                          src={BASE_URL + e.logo}
                          width={0}
                          height={0}
                          sizes="100vh"
                          style={{ width: "100%" }}
                          blurDataURL="/images/content/profile/Photo.png"
                          priority={true}
                        />
                      </div>
                      <div className="w-full text-left mt-2">
                        <p className="text-[2.1vw] md:text-[16px] lg:text-lg font-bold underline leading-tight">
                          {e.nama}
                        </p>
                      </div>
                    </div>
                    <div className="w-full text-left ">
                      <p className="text-[2.1vw] md:text-[16px] lg:text-lg  text-blue-500">Selengkapnya</p>
                    </div>
                  </div>
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

        {/* Tombol Kanan */}
        <button
          disabled={news.data.length < 18}
          onClick={() => {
            if (pageParams) {
              const params = new URLSearchParams(searchParams);
              params.set("pageParams", parseInt(pageParams) + 1); // Set default ke empty string
              replace(`${pathname}?${params}`);
            }
          }}
          className="disabled:cursor-not-allowed text-slate-800 hover:bg-slate-300 disabled:hover:bg-transparent disabled:text-slate-200 absolute right-1 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 text-3xl font-bold rounded-full z-10"
        >
          <ArrowRightCircleIcon
            aria-hidden="true"
            className={" group-hover:text-indigo-600 h-6 md:h-12 w-6 md:w-12  rounded-full shrink-0"}
          />
        </button>
      </div>

      <Drawer open={open} setOpen={setOpen}>
        <FilterNews setOpen={setOpen} />
      </Drawer>
    </>
  );
}
