import { SimpleProduct } from '@/model/product';
import Image from 'next/image';
import React from 'react';

type Props = {
  product: SimpleProduct;
};
export default function ProductCard({ product }: Props) {
  const { name, category, image, price } = product;
  return (
    <div className='group'>
      <Image
        className='object-cover w-full cursor-pointer aspect-square group-hover:opacity-80'
        src={image}
        alt={`photo by ${name}`}
        width={500}
        height={500}
      />
      <div className='flex flex-col py-5'>
        <span className='text-neutral-800'>{name}</span>
        <span className='font-semibold'>{price}원</span>
      </div>
    </div>
  );
}
