import { auth } from "./auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
 
export async function middleware(request: NextRequest) {
  const session = await auth()
  const isAdmin = session?.user?.role === "ADMIN"

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Protect user-only routes
  if (
    request.nextUrl.pathname.startsWith('/checkout') ||
    request.nextUrl.pathname.startsWith('/account')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/checkout',
    '/account/:path*'
  ]
}