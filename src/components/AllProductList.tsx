'use client';

import ProductCard from '@/components/ui/ProductCard';
import { SimpleProduct } from '@/model/product';
import useSWR from 'swr';
import Loading from './Loading';
export default function AllProductList() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<SimpleProduct[]>('/api/products');
  return (
    <>
      {isLoading && <Loading />}
      {products && (
        <ul className='grid grid-cols-1 gap-3 px-2 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
