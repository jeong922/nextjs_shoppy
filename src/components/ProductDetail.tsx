'use client';

import Image from 'next/image';
import { useState, cache } from 'react';
import Loading from './Loading';
import Link from 'next/link';
import ArrowRightIcon from './icon/ArrowRightIcon';
import { useProduct } from '@/hooks/useProduct';
import ProductDetailLikeButton from './ProductDetailLikeButton';
import { useSession } from 'next-auth/react';
import { useCartItems } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import CloseIcon from './icon/CloseIcon';
import { replacePrice } from '@/util/util';

type Props = {
  productId: string;
};

export default function ProductDetail({ productId }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { product, error, isLoading, setLike } = useProduct(productId);
  const { addItem } = useCartItems();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOption(e.target.value);
    }
  };

  const handleAddCart = () => {
    if (user && product && selectedOption) {
      addItem(user.id, product?.id, selectedOption).then(() =>
        setIsSuccess(true)
      );
    }
  };

  const handleModal = () => {
    isSuccess ? setIsSuccess(false) : setIsSuccess(true);
  };

  return (
    <>
      <section className='flex items-center justify-center w-full'>
        {isLoading && <Loading />}
        {product && (
          <div className='flex flex-col w-full max-w-4xl pb-10 sm:flex-row'>
            <Image
              className='object-cover w-full mb-4 shadow-lg sm:mb-0 sm:mr-7 sm:h-96 sm:w-96 aspect-square'
              src={product.image}
              alt={`photo by ${product.name}`}
              width={500}
              height={500}
              priority
            />
            <div>
              <div className='flex items-center justify-between mb-3 '>
                <h4 className='mr-4 text-3xl font-semibold'>{product.name}</h4>
                <ProductDetailLikeButton product={product} setLike={setLike} />
              </div>

              <Link
                href={`/${product.category}`}
                className='flex items-center mb-3 text-neutral-500 hover:text-mainColor'
              >
                <span className='text-xs uppercase'>{product.category}</span>
                <ArrowRightIcon />
              </Link>

              <span className='text-lg font-semibold'>
                {replacePrice(product.price)}원
              </span>
              <p className='my-3 text-neutral-500'>{product.description}</p>
              <div className='flex flex-col py-3 border-y border-neutral-200'>
                <span className='mb-2'>사이즈</span>
                <ul className='flex flex-wrap'>
                  {product.size &&
                    product.size.map((option) => (
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
                <button
                  onClick={handleAddCart}
                  className={`${
                    !selectedOption && 'opacity-70'
                  } w-full p-3 text-white bg-black `}
                  disabled={!selectedOption}
                >
                  장바구니
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {isSuccess && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-modal_bg'>
          <div className='relative z-50 px-10 m-3 text-center rounded-md shadow-lg py-7 text-md bg-neutral-50'>
            <button
              onClick={handleModal}
              className='absolute cursor-pointer top-3 right-3'
            >
              <CloseIcon />
            </button>
            <p className='mb-1 text-base'>장바구니에 상품이 담겼습니다.</p>
            <p className='text-base'>장바구니로 이동하시겠습니까?</p>
            <div className='flex w-full gap-4 mt-3'>
              <button
                className='w-1/2 py-1 text-white bg-black border'
                onClick={() => router.push('/cart')}
              >
                확인
              </button>
              <button
                className='w-1/2 py-1 bg-white border'
                onClick={handleModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
