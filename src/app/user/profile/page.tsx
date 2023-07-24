'use client';

import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect('/');
  }

  return (
    <>
      <Profile />
    </>
  );
}
