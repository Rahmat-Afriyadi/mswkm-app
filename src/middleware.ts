import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import axios from "./lib/axios";

export const config = {
  matcher: "/api/refresh",
};

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const cookiesList = request.cookies.getAll();
  const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  // no session token present, remove all next-auth cookies and redirect to sign-in
  if (!cookiesList.some((cookie) => cookie.name.includes(sessionCookie))) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
    });

    return response;
  }

  // session token present, check if it's valid
  const session = await fetch(`${process.env.NEXTAUTH_URL}/session`, {
    headers: {
      "content-type": "application/json",
      cookie: request.cookies.toString(),
    },
    credentials: "include",
  } satisfies RequestInit);
  const json = await session.json();

  const data = Object.keys(json).length > 0 ? json : null;

  // session token is invalid, remove all next-auth cookies and redirect to sign-in
  if (!session.ok || !data?.user) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
    });

    return response;
  }

  // session token is valid so we can continue
  const resNewAccessToken = await fetch(process.env.NEXT_PUBLIC_BASE_API + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ refresh_token: json?.user?.refreshToken }),
  });
  const newAccessToken = await resNewAccessToken.json();
  const response = NextResponse.next();
  const newSessionToken = await encode({
    secret: process.env.NEXT_PUBLIC_SECRET,
    token: {
      user: {
        ...json?.user,
        accessToken: newAccessToken.access_token,
      },
      // ...otherTokenData,
    },
    maxAge: 1 * 24 * 60 * 60, // 30 days, or get the previous token's exp
  });

  // // update session token with new access token
  response.cookies.set(sessionCookie, newSessionToken);

  return response;

  return NextResponse.next();
};
