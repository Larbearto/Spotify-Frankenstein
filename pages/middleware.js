import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
	// Token will exist if user is logged in
	const token = await getToken({ req, secret: process.env.JWT_SECRET })

	const { pathname } = req.nextUrl

	// Allow the request if the following is true...
	//    1. It's a request for next-auth session and provider fetching (e.g. /api/auth/session)
	//    2. If the token exists then the user is allowed to access the page
	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next()
	}

	// Redirect them to the login page if they don't have a token and are requesting a protected route.
	if (!token && pathname !== '/login') {
		return NextResponse.redirect('./login')
	}
}
