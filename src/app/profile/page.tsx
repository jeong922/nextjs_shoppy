'use client';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect('/');
  }

  return (
    <div className='flex justify-center w-full'>
      <Sidebar />
      <Profile />
    </div>
  );
}
