import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { authService } from '@/appWrite/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(request: NextRequest) {
  // const session = await authService.getUser();
  // if (session) {
  //   console.log('session', session);
  // } else {
  //   console.log('logged out');
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*'],
};
