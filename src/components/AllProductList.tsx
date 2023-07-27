'use client';

import ProductCard from '@/components/ui/ProductCard';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';
import ProductList from './ProductList';

export default function AllProductList() {
  const { products, error, isLoading, setLike } = useProducts();
  return (
    <>
      {isLoading && (
        <div className='fixed inset-0 z-20 justify-center bg-white pt-28'>
          <Loading />
        </div>
      )}
      <h2 className='px-6 mb-2 text-2xl font-semibold'>New</h2>
      <ProductList products={products} setLike={setLike} />
    </>
  );
}
