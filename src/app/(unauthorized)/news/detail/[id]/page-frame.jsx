import { formatDateLongMonth } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const FroalaEditorView = dynamic(() => import("react-froala-wysiwyg/FroalaEditorView"), { ssr: false });

const BASE_URl = process.env.NEXT_PUBLIC_BASE_API;

export default function PageFrame({ news }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-52">
        <div className="w-11/12 md:w-10/12 h-auto shadow-md py-4 px-3 ">
          <div
            className="w-full aspect-[21/9] bg-slate-600 bg-cover bg-center"
            style={{
              backgroundImage: `url('${
                news.banner == "" ? "/images/content/profile/Photo.png" : BASE_URl + news.banner
              }')`,
            }}
          ></div>
        </div>
        <div className="w-11/12 md:w-10/12 h-auto py-4 px-3 ">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">{news.nama}</p>
          <br />
          <FroalaEditorView model={news.deskripsi} />
        </div>
      </div>
      <br />
      <div className="w-full relative bottom-0">
        <div className="w-full h-auto absolute bottom-0">
          {windowWidth < 641 && (
            <Image
              src={"/images/content/footer/Footer.png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          {windowWidth > 640 && (
            <Image
              src={"/images/content/footer/Footer-lg.png"}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </>
  );
}
