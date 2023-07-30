'use client';

import { SimpleProduct } from '@/model/product';
import useSWR from 'swr';
import { useState, FormEvent } from 'react';
import ProductList from './ProductList';

export default function ProductSearch() {
  const [keyword, setKeyword] = useState('');
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<SimpleProduct[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          autoFocus
          placeholder='검색어를 입력하세요.'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>

      <ProductList products={products} setLike={() => {}} />
    </section>
  );
}
