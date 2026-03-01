import { NextResponse } from "next/server";

// Auth disabled — dev mode: all routes accessible directly
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
