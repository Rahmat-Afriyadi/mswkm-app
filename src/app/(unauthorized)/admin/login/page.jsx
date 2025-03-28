"use server";

import { Suspense } from "react";
import PageFrame from "./page-frame";

export default async function Page() {

  return (
    <Suspense>
      <PageFrame/>
    </Suspense>
  );
}
