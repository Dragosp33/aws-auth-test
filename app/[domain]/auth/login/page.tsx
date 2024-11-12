'use client';
import { signIn } from 'next-auth/react';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div className='flex w-[300px]'>
      <button onClick={() => signIn('google')}>Google</button>
      <button onClick={() => signIn('github')}>Github</button>
    </div>
  );
};

export default page;
