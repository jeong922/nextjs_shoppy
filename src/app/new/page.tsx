'use client';

import NewProduct from '@/components/NewProduct';
import { DetailUser } from '@/model/user';
import { redirect } from 'next/navigation';
import useSWR from 'swr';

export default function NewProductPage() {
  const { data } = useSWR<DetailUser>('/api/me');

  if (!data?.isAdmin) {
    redirect('/');
  }

  return (
    <div className='w-full pt-32'>
      <NewProduct />
    </div>
  );
}
