import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith("/admin")) {
    // Skip protection for setup and login
    if (path === "/admin/setup" || path === "/admin/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get("admin_session")?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const decoded = await decrypt(session);
      if (!decoded || !decoded.id) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
