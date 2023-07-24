'use client';

import { FullProduct } from '@/model/product';
import Image from 'next/image';
import useSWR from 'swr';
import { useState } from 'react';
import Loading from './Loading';
import HeartIcon from './icon/HeartIcon';
import Link from 'next/link';
import ArrowRightIcon from './icon/ArrowRightIcon';
import ProductLikeButton from './ProductLikeButton';

type Props = {
  productId: string;
};

export default function ProductDetail({ productId }: Props) {
  const {
    data: product,
    error,
    isLoading,
  } = useSWR<FullProduct>(`/api/products/${productId}`);

  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOption(e.target.value);
    }
  };

  return (
    <section className='w-full px-4'>
      {isLoading && <Loading />}
      {product && (
        <div className='flex flex-col w-full max-w-4xl sm:flex-row'>
          <Image
            className='object-cover w-full mb-4 shadow-lg sm:mb-0 sm:mr-7 sm:h-96 sm:w-96 aspect-square'
            src={product.image}
            alt={`photo by ${product.name}`}
            width={500}
            height={500}
          />
          <div>
            <div className='flex items-center justify-between mb-3 '>
              <h4 className='text-3xl font-semibold'>{product.name}</h4>
              <ProductLikeButton product={product} />
            </div>

            <Link
              href={`/${product.category}`}
              className='flex items-center mb-3 text-neutral-500 hover:text-mainColor'
            >
              <span className='text-xs uppercase'>{product.category}</span>
              <ArrowRightIcon />
            </Link>

            <span className='text-lg font-semibold'>{product.price}원</span>
            <p className='my-3 text-neutral-500'>{product.description}</p>
            <div className='flex flex-col py-3 border-y border-neutral-200'>
              <span className='mb-2'>사이즈</span>
              <ul className='flex flex-wrap'>
                {product.size.map((option) => (
                  <li
                    key={option}
                    className={`${
                      selectedOption === option
                        ? 'border-2 border-mainColor'
                        : 'border-2 border-neutral-200'
                    } mb-2 mr-2 text-center w-14 shrink-0`}
                  >
                    <input
                      className='hidden'
                      id={option}
                      type='radio'
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleSelectOption}
                    />
                    <label
                      className='block px-2 py-1 cursor-pointer'
                      htmlFor={option}
                    >
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex gap-4'>
              <button className='w-full p-3 text-white bg-black'>
                장바구니
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
