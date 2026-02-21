import { NextResponse, type NextRequest } from "next/server"

import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()

  if (!session?.user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  if (adminEmail && session.user.email.toLowerCase() !== adminEmail) {
    const url = request.nextUrl.clone()
    url.pathname = "/unauthorized"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
