'use client';

import ProductCard from '@/components/ui/ProductCard';
import Loading from './Loading';
import { useProducts } from '@/hooks/useProducts';

export default function AllProductList() {
  const { products, error, isLoading, setLike } = useProducts();
  return (
    <>
      {isLoading && <Loading />}
      {products && (
        <ul className='grid grid-cols-1 gap-3 px-4 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} setLike={setLike} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
