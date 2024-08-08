"use client";

import React, { useEffect, useState, Fragment } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  console.log("ini ession yaa ", session);

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
      <div className="w-full px-10 absolute z-50 top-5">
        <div className="rounded-lg bg-slate-950 bg-opacity-35 grid grid-cols-12">
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <input
              placeholder="search"
              type="text"
              className="text-white text-center max-w-lg pt-3 pb-2 block w-full mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 placeholder-white border-white focus:border-slate-400"
            />
          </div>
          {session?.user?.name ? <div className="col-span-4 flex items-center justify-end pr-5 text-white">
            <p className="font-bold mr-5">{message + " " + session?.user?.name} </p>
            <a
              type="button"
              onClick={() => {
                signOut({ redirect: false }).then();
              }}
              className="text-white hover:text-yellow hover:bg-cyan-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg">
                <ArrowLeftStartOnRectangleIcon
                  style={{
                    transition: "transform 0.5s ease-in-out",
                  }}
                  className={`text-white group-hover:text-yellow h-6 w-6 shrink-0 `}
                  aria-hidden="true"
                />
              </span>
            </a>
          </div> : <div className="col-span-4 flex items-center justify-center text-white"><a href="/login">Login</a></div>}
        </div>
      </div>
    </>
  );
}
