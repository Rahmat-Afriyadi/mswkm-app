"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { merchantSearch } from "@/server/admin/merchant/merchant-search";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const [message, setMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [seearchBox, setSearchBox] = useState(false);

  const handleMessage = () => {
    var today = new Date();
    var hrs = today.getHours();

    if (hrs < 12) {
      setMessage("Good morning");
    } else if (hrs < 18) {
      setMessage("Good afternoon");
    } else {
      setMessage("Good evening");
    }
  };

  useEffect(() => {
    handleMessage();
  }, []);

  const { data: merchant, isLoading } = useQuery({
    queryKey: ["master-merchant-search", searchInput],
    queryFn: async () =>
      await merchantSearch({
        search: searchInput,
      }),
    initialData: { data: [{ id: "", nama: "" }] },
  });

  if (isLoading) {
    return "loading";
  }

  console.log("ini merchants yaa ", merchant);

  return (
    <>
      {/* <div className="w-full px-10 bg-slate-300 absolute left-0 top-0 right-0 bottom-0 m-auto z-50">
        <input
            placeholder="search"
            type="text"
            className="text-white text-center pt-3 pb-2 block w-full mt-0 bg-transparent appearance-none z-1 focus:outline-none focus:ring-0 placeholder-white border-white focus:border-slate-400"
        />
      </div> */}
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
              <p className="bg-slate-300 text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full border-l-4 border-l-cyan-400">
                {merchant.data[0]?.nama}
              </p>
            )}
            {!isLoading &&
              searchInput.length > 0 &&
              merchant &&
              merchant.data.slice(1).map((e) => {
                console.log("ini data yaa ", e);
                return (
                  <p key={e.id + " search"} className="text-lg py-1 px-5 hover:bg-slate-300 rounded-r-full">
                    {e.nama}
                  </p>
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
