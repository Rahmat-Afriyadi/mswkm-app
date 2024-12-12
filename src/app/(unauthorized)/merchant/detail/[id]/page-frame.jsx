import { formatDateLongMonth } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const BASE_URl = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame({ merchant }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 py-4 px-3 gap-x-2">
          <div className="col-span-12 lg:col-span-3 md:col-span-4 p-2 flex flex-col items-center">
            <div className="w-7/12 md:w-full">
              <Image
                alt="slide_1"
                src={BASE_URl + merchant.logo}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                blurDataURL="/images/content/profile/Photo.png"
              />
            </div>
            <br />
            <div className="grid grid-cols-12 gap-x-2 w-full">
              {merchant.kategori.map((f) => {
                return (
                  <div key={f.id + " kategori-detail"} className="col-span-6 lg:col-span-4 ">
                    <p className="bg-slate-50 text-slate-800 rounded-lg text-xs leading-none px-3 py-2 shadow-md">
                      {f.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 md:col-span-8 rounded-md px-3 mt-3 md:mt-0">
            <p className="text-3xl font-bold">{merchant.nama}</p>
            <br />
            <FroalaEditorView model={merchant.deskripsi} />
          </div>
        </div>
      </div>
      <br />
      <div className="flex justify-center">
        <div className="w-11/12 md:w-10/12 h-auto grid grid-cols-12 py-4 gap-x-3 gap-y-5">
          {merchant.outlets.map((e) => {
            return (
              <>
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-md shadow-md">
                  <div className="grid grid-cols-12">
                    <div className="col-span-3 flex items-center h-full">
                      <div className="rounded-l-md overflow-x-hidden ">
                        <Image
                          alt="slide_1"
                          src={BASE_URl + merchant.logo}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                          blurDataURL="/images/content/profile/Photo.png"
                        />
                      </div>
                    </div>
                    <div className="col-span-9 h-full flex flex-col justify-center items-start px-3 py-1">
                      <p className="font-bold text-lg leading-none">{e.nama}</p>
                      <p className="text-sm leading-none mt-1">
                        Berlaku s/d: {formatDateLongMonth(new Date(merchant.valid_thru))}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
