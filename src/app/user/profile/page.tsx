import Profile from '@/components/Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프로필',
  description: '프로필',
};

export default function ProfilePage() {
  return (
    <div className='w-full'>
      <Profile />
    </div>
  );
}
