// Optionally, don't invoke Middleware on some paths
import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { NextResponse } from 'next/server';
// todos:
// move callbacks, sessions from '.auth.ts' to 'auth.config.ts'
// auth.ts will include only types, jwt strategy and mongoDB adapter.

const { auth } = NextAuth(authConfig);

//import { auth } from './auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  console.log('route: ', nextUrl.pathname);
  //console.log('headers, ', req.headers);
  //console.log('COOKIES ', req.cookies);
  const callback = nextUrl.searchParams.get('callbackUrl');
  // console.log('LOGGED: ', isLoggedIn);

  const host = req.headers.get('host') || '';
  const subdomain = host.split('.')[0]; // Extract subdomain
  const url = req.nextUrl.clone();

  if (nextUrl.pathname.startsWith('/api/auth/')) {
    return;
  }
  if (subdomain && subdomain !== 'localhost:3000') {
    console.log(subdomain);
    // Append subdomain to the pathname to match app/[domain]
    url.pathname = `/${subdomain}${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
