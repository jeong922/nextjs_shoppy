import NewProduct from '@/components/NewProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제품 등록',
  description: '제품 등록',
};

export default function NewProductPage() {
  return (
    <div className='w-full pt-32'>
      <NewProduct />
    </div>
  );
}
