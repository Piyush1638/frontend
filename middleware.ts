import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const auth_session = request.cookies.get('auth_session')?.value;
//   const password = request.cookies.get('password')?.value;

  if (request.nextUrl.pathname === '/detection') {
    if (!auth_session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/detection'], // ONLY protect /detection
};
