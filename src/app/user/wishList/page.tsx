import WishList from '@/components/WishList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '위시리스트',
  description: '관심 있는 제품을 위시리스트에 담아보세요.',
};

export default function WishListPage() {
  return (
    <div className='w-full'>
      <WishList />
    </div>
  );
}
