import { formatDateLongMonth } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/20/solid";

const FroalaEditorView = dynamic(() => import("react-froala-wysiwyg/FroalaEditorView"), { ssr: false });

const BASE_URl = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame({ merchant }) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 md:w-10/12 h-auto shadow-md grid grid-cols-12 py-4 px-3 gap-x-2">
          <div className="col-span-12 lg:col-span-3 md:col-span-4 p-1 flex flex-col items-center">
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
            <div className="w-full px-3 md:px-0">
              <a className="flex font-bold items-center h-auto" href={merchant.website}>
                <p className="leading-none font-bold mr-2 mt-1">
                  <GlobeAltIcon className="h-7 w-7" />
                </p>
                <p className="leading-none">{merchant.website.split("//")[1].replace("/", "")}</p>
              </a>
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
                <a
                  className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-md shadow-md"
                  href={"/outlet/detail/" + e.id}
                >
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
                </a>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
