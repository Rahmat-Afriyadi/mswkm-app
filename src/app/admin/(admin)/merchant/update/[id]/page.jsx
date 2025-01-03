"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MerchantDetail } from "@/server/admin/merchant/merchant-detail";
import FormMerchant from "@/components/form/form-merchant";
import { ClipLoader } from "react-spinners";
// import { ReadVacancy } from "@/server/vacancy/read-vacancy";
// import FormVacancy from "@/app/ui/form-vacancy";

function EditVacanciesPage({ params }) {
  const router = useRouter();

  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["read-merchant", id],
    queryFn: async () => await MerchantDetail(id),
  });
  if (isLoading) {
    return (
      <div className="w-full ">
        <div className="w-full flex flex-col items-center bg-cover bg-center h-screen justify-center">
          <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5 }} />
        </div>
      </div>
    );
  }
  if (data.status == 200) {
    const valid_from = new Date(data.data.valid_from);
    const valid_thru = new Date(data.data.valid_thru);
    data.data.valid_from = valid_from.toISOString().split("T")[0];
    data.data.valid_thru = valid_thru.toISOString().split("T")[0];
  }
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
          <FormMerchant defaultValues={data.data} isEditing={true} />
        </div>
      </div>
    </>
  );
}

export default EditVacanciesPage;
