import { middleware } from "@/middleware";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const session = await fetch(`${process.env.NEXTAUTH_URL}/session`, {
    headers: {
      "content-type": "application/json",
      cookie: _req.cookies.toString(),
    },
  });
  const json = await session.json();
  const resNewAccessToken = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: json?.user?.refreshToken }),
  });
  const newAccessToken = await resNewAccessToken.json();
  return NextResponse.json({ token: newAccessToken });
};
