'use client';

import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/service/cart';
import ShoppingBagIcon from '@/components/icon/ShoppingBagIcon';
import Loading from './Loading';
import { useCartItems } from '@/hooks/useCart';
import { replacePrice } from '@/util/util';

export default function CartItems() {
  const { cartItems, isLoading, error } = useCartItems();

  const totalPrice =
    cartItems &&
    cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  const deliveryCharge =
    cartItems && cartItems.length === 0 ? 0 : totalPrice! > 30000 ? 0 : 3000;

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-4xl px-8 pb-10 mx-auto mt-9 sm:px-3'>
      {isLoading && <Loading />}
      <h2 className='w-full pb-3 mb-3 text-2xl text-center '>장바구니</h2>
      {cartItems ? (
        <section className='flex justify-center w-full mt-7 border-y-2 border-y-neutral-200'>
          {cartItems.length < 1 ? (
            <div className='flex flex-col items-center py-28'>
              <div className='mb-4 mr-2 text-7xl text-neutral-300'>
                <ShoppingBagIcon styles='opacity-70' />
              </div>
              <span className='text-neutral-500'>
                장바구니에 담긴 상품이 없습니다.
              </span>
            </div>
          ) : (
            <table className='w-full'>
              <thead>
                <tr className='border-b border-neutral-200'>
                  <th className='py-3'>상품 정보</th>
                  <th className='hidden py-3 sm:block'>수량</th>
                  <th className='py-3'>금액</th>
                  <th className='py-3'></th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item: CartItemType) => (
                    <tr
                      key={item.id}
                      className='w-full border-b border-neutral-200 last:border-none'
                    >
                      <CartItem product={item} />
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </section>
      ) : (
        <div className='flex flex-col items-center w-full py-28 border-y-2 border-y-neutral-200'>
          <div className='mb-4 mr-2 text-7xl text-neutral-300'>
            <ShoppingBagIcon styles='opacity-70' />
          </div>
          <span className='text-neutral-500'>
            장바구니에 담긴 상품이 없습니다.
          </span>
        </div>
      )}

      <section className='flex items-center justify-around w-full px-3 py-8 mt-8 border-y-2 border-neutral-200'>
        <div className='text-center'>
          <p className='text-lg font-semibold'>
            {totalPrice ? replacePrice(totalPrice) : 0}원
          </p>
          <p className='text-sm text-neutral-600'>상품금액</p>
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold'>
            {replacePrice(deliveryCharge)}원
          </p>
          <p className='text-sm text-neutral-600'>배송비</p>
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold'>
            {totalPrice ? replacePrice(totalPrice! + deliveryCharge) : '0'}원
          </p>
          <p className='text-sm text-neutral-600'>총 주문금액</p>
        </div>
      </section>
      <div className='flex justify-center w-full gap-4 mt-5'>
        <button className='w-full p-3 text-white bg-black'>쇼핑계속하기</button>
        <button className='w-full p-3 text-white bg-black'>
          전체상품 주문
        </button>
      </div>
    </div>
  );
}
