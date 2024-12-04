import type { NextAuthConfig } from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { NextRequest } from 'next/server';

const getSiteUrl = (req?: NextRequest) => {
  console.log('GET SITE URL HAS BEEN CALLED!!!!!');
  if (!req) {
    return undefined;
  }

  const { headers } = req;
  const host = headers.get('X-Forwarded-Host'); // a tenant subdomain or tenant's own domain
  const proto = headers.get('X-Forwarded-Proto');

  const k = host && proto ? `http://${host}` : 'http://localhost:3000';
  console.log('RETURNED BASE URL::: ', k);
  return k;
};

const authConfig = {
  debug: true,
  providers: [
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID,
      allowDangerousEmailAccountLinking: true,
      redirectProxyUrl: 'http://localhost:3000/api/auth',
    }),
    GitHub({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        params: { scope: 'user:email' },
      },
      redirectProxyUrl: 'http://localhost:3000/api/auth',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  jwt: { maxAge: 60 * 60 * 24 },
  trustHost: true,
  basePath: '/api/auth',
  baseUrl: (r: any) => getSiteUrl(r) ?? 'http://localhost:3000',
} satisfies NextAuthConfig;

export default authConfig;
