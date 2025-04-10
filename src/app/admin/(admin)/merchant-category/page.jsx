"use client";

import Search from "@/components/atoms/search";
import React from "react";
import TableFrame from "./table-frame";
import Button from "@/components/form/input/button";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="px-4 sm:px-0 lg:px-0">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Kategori</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the kategoris in your account including their name, title, email and kategori.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              label="Add New"
              type="button"
              icon={PlusIcon}
              disabled={!true}
              onClick={() => router.push("/admin/kategori/add")}
            />
          </div>
        </div>
      </div>
      <br />
      <Search id="search" name={"search"} placeholder={"Search for kategori..."} />
      <TableFrame />
    </>
  );
}
