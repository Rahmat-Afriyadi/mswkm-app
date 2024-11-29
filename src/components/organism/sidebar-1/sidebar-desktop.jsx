"use client";

import { navigation, secondaryNavigation } from "./item";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarDesktop({ open, setOpen }) {
  const segment = useSelectedLayoutSegment();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={`hidden ${open ? "w-72" : "w-16 "} lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col duration-700`}>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cyan-600 px-6 pb-4 shadow-lg text-white">
        <strong
          style={{ transition: "transform 0.5s ease-in-out" }}
          className={`absolute left-60 top-4 text-2xl cursor-pointer ${!open ? "-translate-x-[220px]" : ""}`}
          onClick={() => {
            router.back();
          }}
        >
          {"<-"}
        </strong>

        <div className="flex h-16 shrink-0 overflow-hidden items-center justify-between text-white">
          <strong
            style={{ transition: "transform 0.5s ease-in-out" }}
            className={`text-2xl ${!open ? "-translate-x-16" : ""}`}
          >
            WKM
          </strong>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  if (session?.user?.is_admin) {
                    return (
                      <li key={item.name}>
                        <a
                          href={item.to}
                          className={classNames(
                            item.to === `/${segment}`
                              ? "bg-black text-yellow"
                              : "text-cyan-200 hover:text-yellow hover:bg-cyan-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            style={{
                              transition: "transform 0.5s ease-in-out",
                            }}
                            className={classNames(
                              item.to === `/${segment}`
                                ? "bg-black text-yellow"
                                : "text-cyan-200 group-hover:text-yellow",
                              "h-6 w-6 shrink-0 mr-2",
                              !open ? "scale-125" : ""
                            )}
                            aria-hidden="true"
                          />
                          <span
                            style={{ transition: "transform 0.5s ease-in-out" }}
                            className={`${!open ? "translate-x-2 opacity-0" : ""}`}
                          >
                            {!open ? "- " : item.name}
                          </span>
                        </a>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </li>
            <li>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.to}
                      className={classNames(
                        item.to === `/${segment}`
                          ? "bg-black text-yellow"
                          : "text-cyan-200 hover:text-yellow hover:bg-cyan-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-500">
                        <item.icon
                          style={{
                            transition: "transform 0.5s ease-in-out",
                          }}
                          className={classNames(
                            item.to === `/${segment}`
                              ? "bg-black text-yellow"
                              : "text-cyan-200 group-hover:text-yellow",
                            "h-6 w-6 shrink-0",
                            !open ? "scale-125" : ""
                          )}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        style={{ transition: "transform 0.5s ease-in-out" }}
                        className={`${!open ? "translate-x-2" : ""} truncate`}
                      >
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    type="button"
                    onClick={() => {
                      signOut({ redirect: false }).then(() => {
                        void signIn();
                      });
                    }}
                    className="text-cyan-200 hover:text-yellow hover:bg-cyan-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-500">
                      <ArrowLeftStartOnRectangleIcon
                        style={{
                          transition: "transform 0.5s ease-in-out",
                        }}
                        className={`text-cyan-200 group-hover:text-yellow h-6 w-6 shrink-0 ${!open ? "scale-125" : ""}`}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      style={{ transition: "transform 0.5s ease-in-out" }}
                      className={`${!open ? "translate-x-2" : ""} truncate`}
                    >
                      Logout
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
