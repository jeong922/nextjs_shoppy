import FilteredProducts from '@/components/FilteredProducts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '액세서리',
  description: '제품 목록',
};

export default function AccShoesPage() {
  return (
    <div className='w-full pt-32'>
      <FilteredProducts />
    </div>
  );
}
