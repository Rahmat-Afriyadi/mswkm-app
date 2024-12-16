import { formatDateLongMonth } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/20/solid";

const FroalaEditorView = dynamic(() => import("react-froala-wysiwyg/FroalaEditorView"), { ssr: false });

const BASE_URl = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame({ outlet }) {
  const [tab, setTab] = useState(1);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 py-4 px-3 gap-x-2">
          <div className="col-span-12 flex flex-col justify-center items-center">
            <div className="w-full lg:w-6/12 shadow-lg">
              <Image
                alt="slide_1"
                src={
                  outlet.merchant.banner ? BASE_URl + outlet.merchant.banner : "/images/content/default/banner 21-9.jpg"
                }
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                blurDataURL="/images/content/profile/Photo.png"
              />
            </div>
            <br />
            <div className="w-full lg:w-10/12">
              <div className="grid grid-cols-12 gap-x-3 lg:gap-x-0">
                <div className="col-span-2">
                  <Image
                    alt="slide_1"
                    src={outlet.merchant.logo ? BASE_URl + outlet.merchant.logo : "/images/content/profile/Photo.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="max-w-28 rounded-full"
                    blurDataURL="/images/content/profile/Photo.png"
                  />
                </div>
                <div className="col-span-10 flex flex-col justify-center h-full pl-2 lg:pl-0">
                  <p className="font-bold text-lg leading-none">{outlet.merchant.nama}</p>
                  <div className="w-full flex flex-wrap gap-x-2 gap-y-1 mt-2">
                    {outlet.merchant.kategori.map((e) => {
                      return (
                        <p
                          key={e.id}
                          className="text-xs leading-none bg-slate-50 text-red-500 rounded-md w-max px-2 py-1"
                        >
                          {e.name}
                        </p>
                      );
                    })}
                  </div>
                  {/* <p className="text-sm leading-none mt-1">
                    Berlaku s/d: {formatDateLongMonth(new Date(outlet.merchant.valid_thru))}{" "}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="flex justify-center">
        <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 rounded-lg overflow-hidden">
          <div
            onClick={() => setTab(1)}
            className={`cursor-pointer px-3 py-2 ${
              tab == 1 ? "bg-red-400 text-white hover:border-2 " : "hover:bg-red-400 hover:text-white"
            }  col-span-6 text-center border-r-2 border-red-400`}
          >
            Outlet
          </div>
          <div
            onClick={() => setTab(2)}
            className={`cursor-pointer px-3 py-2 hover:border-2 hover:border-red-400 ${
              tab == 2 ? "bg-red-400 text-white hover:border-2 " : "hover:bg-red-400 hover:text-white"
            }  col-span-6 text-center`}
          >
            Promo
          </div>
        </div>
      </div>
      <br />
      {tab == 1 && (
        <div className="flex justify-center">
          <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 rounded-lg p-3 lg:p-5">
            <div className="col-span-9">
              <p className="text-xl font-bold">{outlet.nama}</p>
              <ul class="list-disc list-inside text-gray-700">
                <li className="mt-2">{outlet.alamat}</li>
              </ul>
              <br />
              <p className="text-xl font-bold">Deskripsi</p>
              <FroalaEditorView model={outlet.merchant.deskripsi} />
            </div>
            <a
              className="col-span-3 cursor-pointer pl-2"
              href={`https://www.google.com/maps?q=${outlet.latitude},${outlet.longitude}`}
            >
              <Image
                alt="gmaps-icon"
                src={"/images/content/button/gmaps.png"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="max-w-28 mx-auto"
                blurDataURL="/images/content/profile/Photo.png"
              />
            </a>
          </div>
        </div>
      )}

      {tab == 2 && (
        <div className="flex justify-center">
          <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 rounded-lg p-3 lg:p-5 place-items-center">
            <div className="col-span-12 h-32 font-bold italic text-xl flex items-center">Coming soon....</div>
          </div>
        </div>
      )}
    </>
  );
}
