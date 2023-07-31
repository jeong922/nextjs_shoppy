import CartItems from '@/components/CartItems';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '장바구니',
  description: '구매를 원하는 제품을 장바구니에 담아보세요.',
};

export default function CartPage() {
  return (
    <div className='w-full pt-32'>
      <CartItems />
    </div>
  );
}
