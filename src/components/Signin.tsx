'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleIcon from './icon/GoogleIcon';
import GithubIcon from './icon/GithubIcon';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

// eslint-disable-next-line react/jsx-key
const icons = [<GoogleIcon />, <GithubIcon className='w-7 h-7' />];

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <div className='flex flex-col w-full max-w-md gap-8'>
      {Object.values(providers).map(({ name, id }, index) => (
        <button
          className='flex items-center justify-center p-4 border rounded-lg border-neutral-300'
          key={id}
          onClick={() => signIn(id, { callbackUrl })}
        >
          <div className='mr-2'>{icons[index]}</div>
          {`Log in with ${name}`}
        </button>
      ))}
    </div>
  );
}
