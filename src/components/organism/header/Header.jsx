"use client"

import React, { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import {
  Bars3Icon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Header() {
  const [message, setMessage] = useState("");

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
            <input placeholder="search" type="text" className="text-white text-center max-w-lg pt-3 pb-2 block w-full mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 placeholder-white border-white focus:border-slate-400"/>
          </div>
        <div className="col-span-4 flex items-center justify-center text-white">
            <a href="/login">Login</a>
        </div>
        </div>
      </div>
    </>
  );
}
