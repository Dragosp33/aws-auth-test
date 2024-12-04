import NextAuth, { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import authConfig from './auth.config';
import { NextRequest } from 'next/server';
import GitHub from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(async () => {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const host = headersList.get('host');

  return {
    ...authConfig,

    events: {
      async signIn({ user, profile, account }) {
        console.log('SIGN IN EVENT: ', { user, profile, account });
      },
      async updateUser({ user }) {
        console.log('UPDATE USER: ', { user });
      },
      async linkAccount({ user, profile, account }) {
        console.log('FROM LINK ACCOUNT: ', { user, profile, account });
      },
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log(user, account, profile, email);
        return true;
      },
    },
  };
});
