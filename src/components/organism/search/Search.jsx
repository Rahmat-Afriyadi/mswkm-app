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

export default function Search() {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

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
        <div class="absolute inset-0 m-auto w-10/12 h-12 bg-white rounded-full flex">
        <input
            placeholder="search"
            type="text"
            className="w-full text-black rounded-full border-0 outline-none focus:outline-none text-center"
        />
        </div>
    </>
  );
}
