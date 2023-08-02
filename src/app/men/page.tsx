import FilteredProducts from '@/components/FilteredProducts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '남성',
  description: '제품 목록',
};

export default function MenPage() {
  return (
    <div className='w-full pt-12'>
      <FilteredProducts />
    </div>
  );
}
