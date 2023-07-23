'use client';

import { FullProduct } from '@/model/product';
import Image from 'next/image';
import useSWR from 'swr';
import { useState } from 'react';

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
    <section className='w-full max-w-4xl'>
      {product && (
        <div className='flex flex-col sm:flex-row'>
          <Image
            className='object-cover sm:mr-7 w-96 aspect-square'
            src={product.image}
            alt={`photo by ${product.name}`}
            width={500}
            height={500}
          />
          <div>
            <h4 className='mb-3 text-3xl font-semibold'>{product.name}</h4>
            <div className='flex items-center mb-3 text-neutral-500'>
              <span className='text-sm'>{product.category}</span>
            </div>

            <span className='text-lg'>{product.price}원</span>
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
            <button className='w-full p-3 text-white bg-black hover:bg-mainColor'>
              장바구니
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
