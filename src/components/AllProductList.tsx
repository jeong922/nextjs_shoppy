'use client';

import ProductCard from '@/components/ui/ProductCard';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';
import ProductList from './ProductList';

export default function AllProductList() {
  const { products, error, isLoading, setLike } = useProducts();
  return (
    <>
      {isLoading && <Loading />}
      <h2 className='px-6 mb-2 text-2xl font-semibold uppercase'>New</h2>
      <ProductList products={products} setLike={setLike} />
    </>
  );
}
