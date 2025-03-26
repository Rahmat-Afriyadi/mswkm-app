"use server";

import { Suspense } from "react";
import PageFrame from "./page-frame";
import { axiosAuth } from "@/lib/axios";

export default async function Page({ params }) {
  const { token } = params;
  const data = await axiosAuth.get("/tokens/detail/" + token);
  if (data.data.no_hp != "") {
    await axiosAuth.post("/auth/generate-new-otp", { no_hp: data.data.no_hp });
  }
  console.log("ini data yaa ", data.data);

  return (
    <Suspense>
      <PageFrame defaultValues={data.data} />
    </Suspense>
  );
}
