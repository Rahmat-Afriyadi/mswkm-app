"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const FormRole = dynamic(() => import("@/components/form/form-role"), { ssr: false });

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-start mb-3">
        <div className="text-sm leading-6">
          <a href="#" type="button" className="flex text-gray-600 hover:text-gray-500" onClick={() => router.back()}>
            <ChevronLeftIcon aria-hidden="true" className="self-center w-4 h-4 mr-2 font-semibold text-gray-400" />
            Back
          </a>
        </div>
      </div>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Content goes here */}
          <FormRole isEditing={false} defaultValues={{}} />
        </div>
      </div>
    </>
  );
}
