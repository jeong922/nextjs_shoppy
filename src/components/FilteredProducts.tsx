'use client';

import Loading from './Loading';
import { useFilteredProducts } from '@/hooks/useProducts';
import ProductList from './ProductList';
import { usePathname } from 'next/navigation';

export default function FilteredProducts() {
  const pathname = usePathname();
  const { products, error, isLoading, setLike } = useFilteredProducts(
    pathname.replace('/', '')
  );

  return (
    <div className='pb-10'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className='pb-4 mx-4 mb-4 text-2xl font-semibold uppercase border-b-2 border-b-neutral-600'>
            {pathname.replace('/', '')}
          </h2>
          <ProductList products={products} setLike={setLike} />
        </>
      )}
    </div>
  );
}
