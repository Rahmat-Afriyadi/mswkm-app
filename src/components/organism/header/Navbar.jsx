import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import iconActive from "../../../../public/images/content/header/Icon active.png";
import icon from "../../../../public/images/content/header/Icon.png";
import icon2Active from "../../../../public/images/content/header/Icon 2 active.png";
import icon2 from "../../../../public/images/content/header/Icon 2.png";
import icon3Active from "../../../../public/images/content/header/Icon 3 active.png";
import icon3 from "../../../../public/images/content/header/Icon 3.png";
import icon4Active from "../../../../public/images/content/header/Icon 4 active.png";
import icon4 from "../../../../public/images/content/header/Icon 4.png";
import { useSession } from "next-auth/react";
import { FolderIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  return (
    <div className=" h-6 w-full">
      <div className="grid grid-cols-12 gap-x-1">
        <div className="col-span-2  flex justify-center z-20 z-20">
          <a
            href="/"
            data-tooltip-id="home"
            data-tooltip-content="Home"
            className="h-5 w-5 sm:h-8 sm:w-8 cursor-pointer"
          >
            <Image
              src={pathname == "/" ? iconActive : icon}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
          <Tooltip id="home" place="top" effect="solid" className="z-10" />
        </div>
        {status == "authenticated" && (
          <>
            {" "}
            <div className="col-span-2  flex justify-center z-20">
              <a
                href="/profile"
                data-tooltip-id="profile"
                data-tooltip-content="Profile"
                className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 cursor-pointer "
              >
                <Image
                  src={pathname == "/profile" ? icon2Active : icon2}
                  alt="illustrasi-1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
              <Tooltip id="profile" place="top" effect="solid" className="z-10" />
            </div>
            <div className="col-span-2  flex justify-center z-20">
              <a
                href="/card"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="E-Card"
                className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 cursor-pointer "
              >
                <Image
                  src={pathname == "/card" ? icon3Active : icon3}
                  alt="illustrasi-1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
              <Tooltip id="my-tooltip" place="top" effect="solid" className="z-10" />
            </div>{" "}
          </>
        )}
        <div className="col-span-2  flex justify-center z-20">
          <a
            href="/merchant"
            data-tooltip-id="merchant"
            data-tooltip-content="Merchant"
            className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 cursor-pointer mt-1"
          >
            <FolderIcon />
          </a>
          <Tooltip id="merchant" place="top" effect="solid" className="z-10" />
        </div>
        <div className="col-span-2  flex justify-center z-20">
          <a
            href="/faq"
            data-tooltip-id="faq"
            data-tooltip-content="Faq"
            className="h-5 w-5 sm:h-8 sm:w-8 md:h-8 md:w-8 cursor-pointer mt-1"
          >
            <Image
              src={pathname == "/faq" ? icon4Active : icon4}
              alt="illustrasi-1"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
          <Tooltip id="faq" place="top" effect="solid" className="z-10" />
        </div>
        {status == "unauthenticated" && (
          <div className="col-span-2  flex items-center">
            <div className="w-full text-center">
              <a
                href="/login"
                className="h-5 w-5 text-center sm:h-8 sm:w-8 sm:text-xl md:h-10 md:w-10 md:text-3xl font-bold cursor-pointer leading-3"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
