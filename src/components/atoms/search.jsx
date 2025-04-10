"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Search({ id, name, placeholder }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value.trim());
    params.set("pageParams", 1);
    setTimeout(() => {}, 300);
    replace(`${pathname}?${params}`);
  }

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("search", "");
  //   replace(`${pathname}?${params}`);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="relative flex items-center w-full lg:w-80 md:w-72 sm:w-64 ">
        <input
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <MagnifyingGlassIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </>
  );
}

export default Search;
