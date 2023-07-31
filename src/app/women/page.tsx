import FilteredProducts from '@/components/FilteredProducts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '여성',
  description: '제품 목록',
};

export default function WomenPage() {
  return (
    <div className='w-full pt-32'>
      <FilteredProducts />
    </div>
  );
}
