'use client';

import ProductCard from '@/components/ui/ProductCard';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';
import ProductList from './ProductList';

export default function AllProductList() {
  const { products, error, isLoading, setLike } = useProducts();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className='pb-4 mx-4 mb-4 text-2xl font-semibold uppercase border-b-2 border-b-neutral-600'>
            New
          </h2>
          <ProductList products={products} setLike={setLike} />
        </>
      )}
    </>
  );
}
