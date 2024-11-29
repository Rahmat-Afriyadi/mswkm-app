import React, { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, Disclosure, Transition } from "@headlessui/react";

import { navigation, secondaryNavigation } from "@/components/organisms/sidebar/item"
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useSelectedLayoutSegment } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarMobile({
  sidebarOpen,
  setSidebarOpen,
}) {
    const segment = useSelectedLayoutSegment()
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-cyan-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <strong className="text-2xl text-white">
                        Asset Management
                      </strong>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.to}
                                  className={classNames(
                                    item.to === `/${segment}`
                                      ? "bg-cyan-700 text-white"
                                      : "text-cyan-200 hover:text-white hover:bg-cyan-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}>
                                  <item.icon
                                    className={classNames(
                                      item.to === `/${segment}`
                                        ? "text-white"
                                        : "text-cyan-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          {/* <div className="text-xs font-semibold leading-6 text-cyan-200">
                            Your teams
                          </div> */}
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {secondaryNavigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.to}
                                  className={classNames(
                                    item.to === `/${segment}`
                                      ? "bg-cyan-700 text-white"
                                      : "text-cyan-200 hover:text-white hover:bg-cyan-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}>
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-cyan-400 bg-cyan-500 text-[0.625rem] font-medium text-white">
                                    <item.icon
                                      className={classNames(
                                        item.to === `/${segment}`
                                          ? "text-white"
                                          : "text-cyan-200 group-hover:text-white",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="truncate">{item.name}</span>
                                </a>
                              </li>
                            ))}
                            <li>
                              <a type="button"
                                onClick={()=>{
                                  signOut({ redirect: false }).then(() => {
                                    void signIn();
                                  });
                                }}
                                // href={"/api/auth/signout"}
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md cursor-pointer text-cyan-200">
                                <ArrowLeftStartOnRectangleIcon
                                  className="w-6 h-6 mr-4 text-cyan-200"
                                  aria-hidden="true"
                                />
                                Logout
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/* <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-cyan-200 hover:bg-cyan-700 hover:text-white">
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-cyan-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
    </>
  );
}
