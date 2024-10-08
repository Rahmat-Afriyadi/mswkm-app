"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "./Navbar";
import { ArrowLeftStartOnRectangleIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();

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
    setWindowWidth(window.innerWidth);
    handleMessage();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let header;
  if (windowWidth > 1023) {
    header = "Header-lg.png";
  } else if (windowWidth > 768) {
    header = "Header-lg.png";
  } else {
    header = "Header.png";
  }

  return (
    <header className="w-full h-auto relative py-2">
      <Image
        src={"/images/content/header/" + header}
        alt="illustrasi-1"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="absolute w-5/12  h-6 top-0 bottom-0  my-auto right-9 flex justify-center">
        <Navbar />
        {status == "authenticated" && (
          <button
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                void signIn();
              });
            }}
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 cursor-pointer" />
          </button>
        )}
      </div>
    </header>
  );
}
