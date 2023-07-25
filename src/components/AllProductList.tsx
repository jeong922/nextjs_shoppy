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
      <ProductList products={products} setLike={setLike} />
    </>
  );
}
