import { withAuth } from "next-auth/middleware"
import { useSession } from "next-auth/react"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname)
    // console.log(req.nextauth.token.role)

    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token.role
    ) {
      return NextResponse.rewrite(new URL("/dashboard", req.url))

    } else {
      return NextResponse.rewrite(new URL("/", req.url))
    }
    // if (
    //   req.nextUrl.pathname.startsWith("/dashboard") &&
    //   req.nextauth.token.role != "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/", req.url))
    // }

  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/dashboard"] }
