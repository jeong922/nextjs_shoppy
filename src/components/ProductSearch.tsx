'use client';

import { useState, FormEvent } from 'react';
import ProductList from './ProductList';
import Loading from './Loading';
import { useSearchProduct } from '@/hooks/useProducts';

export default function ProductSearch() {
  const [keyword, setKeyword] = useState('');
  const { products, isLoading, error, setLike } = useSearchProduct(keyword);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='flex flex-col w-full px-2 pt-32 '>
      <form
        className='flex items-center justify-center w-full px-4 mb-5'
        onSubmit={onSubmit}
      >
        <input
          className='w-full max-w-2xl p-3 border-b-2 outline-none border-b-neutral-500'
          type='text'
          autoFocus
          placeholder='검색어를 입력하세요.'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>

      {!isLoading && !error && products?.length === 0 && (
        <p className='p-24 text-lg text-center text-neutral-500'>
          검색 결과가 없습니다.
        </p>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <ProductList products={products} setLike={setLike} />
      )}
    </section>
  );
}
