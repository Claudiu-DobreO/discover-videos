import { NextResponse } from 'next/server';
import { getUserIdFromToken } from './lib/utils';

export const middleware = async (req) => {
    const token = req.cookies.get('token')?.value || null;
    const userId = getUserIdFromToken(token);
    const { pathname } = req.nextUrl;

    if ((token && userId) || pathname.includes('login')) {
        return NextResponse.next();
    }

    if (!token && !pathname.includes('login')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};