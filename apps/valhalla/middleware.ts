import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, type JWTPayload } from 'jose'
import { JWT_TOKEN } from './utils/constants'
import { User } from 'database/src'
import { MongoDb } from 'database/lib'

export async function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_TOKEN)
      )

      const { id, roles } = payload as JWTPayload
    } catch (err) {
      return NextResponse.redirect(new URL('/error', request.url))
    }

    //TODO validate token
    //TODO set cookie
    //TODO redirect to home
    //  return NextResponse.redirect('/')
  } else {
    //check cookie
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|error|favicon.ico).*)',
}
