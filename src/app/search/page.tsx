import ProductSearch from '@/components/ProductSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색',
  description: '제품 검색',
};

export default function SearchPage() {
  return (
    <div className='w-full'>
      <ProductSearch />
    </div>
  );
}
