'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Button from './ui/Button';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <div>
      {Object.values(providers).map(({ name, id }) => (
        <Button
          key={id}
          text={`Sign In with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </div>
  );
}
