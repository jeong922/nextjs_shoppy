'use client';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar';

export default function ProfilePage() {
  return (
    <div className='flex justify-center w-full'>
      <Sidebar />
      <Profile />
    </div>
  );
}
