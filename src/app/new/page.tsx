'use client';

import NewProduct from '@/components/NewProduct';
import { DetailUser } from '@/model/user';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import useSWR from 'swr';

export const metadata: Metadata = {
  title: '제품 등록',
  description: '제품 등록',
};

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
