import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Limit({ id, name, placeholder }) {
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("limit", e.target.value.trim());
    params.set("pageParams", 1);
    setLimit(e.target.value.trim());
    setTimeout(() => {}, 300);
    replace(`${pathname}?${params}`);
  }

  useEffect(() => {
    return setLimit(searchParams.get("limit"));
  }, [searchParams]);

  return (
    <>
      <select
        name={name}
        id={id}
        defaultValue={searchParams.get("limit")}
        value={searchParams.get("limit")}
        placeholder={placeholder}
        onChange={handleChange}
        className={`cursor-pointer appearance-none block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
      >
        <option value={10} className="py-1 cursor-pointer">
          10
        </option>
        <option value={20} className="py-1 cursor-pointer">
          20
        </option>
        <option value={30} className="py-1 cursor-pointer">
          30
        </option>
        <option value={40} className="py-1 cursor-pointer">
          40
        </option>
        <option value={50} className="py-1 cursor-pointer">
          50
        </option>
      </select>
    </>
  );
}
