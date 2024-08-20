"use client";

import React, { useEffect, useState} from "react";
import { useSession } from "next-auth/react";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [searchInput, setSearchInput] = useState("")
  const [seearchBox, setSearchBox] = useState(false)

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

  return (
    <>
      {/* <div className="w-full px-10 bg-slate-300 absolute left-0 top-0 right-0 bottom-0 m-auto z-50">
        <input
            placeholder="search"
            type="text"
            className="text-white text-center pt-3 pb-2 block w-full mt-0 bg-transparent appearance-none z-1 focus:outline-none focus:ring-0 placeholder-white border-white focus:border-slate-400"
        />
      </div> */}
      <div class="absolute inset-0 m-auto w-3/4 rounded-xl z-10 h-12">
        <input
          onFocus={(e)=>setSearchBox(true)}
          onChange={(e)=>setSearchInput(e.target.value)}
          onBlur={()=>setSearchBox(false)}
          placeholder="search"
          type="text"
          className="w-full text-black rounded-xl border-0 focus:ring-0 focus:border-none outline-none focus:outline-none text-center h-12"
        />
      </div>

      {seearchBox && <div className=" h-auto pt-10">
        <div class="mx-auto w-3/4 max-h-72 z-0 bg-white rounded-b-xl pt-6 pr-5">
          {searchInput.length > 0 && <p className="bg-slate-300 text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full border-l-4 border-l-cyan-400">
            {searchInput}
          </p>}
          <p className="text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full">Lorem Lorem Lorem</p>
          <p className="text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full">Lorem Lorem Lorem</p>
          <p className="text-lg py-2 px-5 hover:bg-slate-300 rounded-r-full">Lorem Lorem Lorem</p>
        </div>
      </div>}
    </>
  );
}
