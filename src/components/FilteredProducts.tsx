'use client';

import Loading from './Loading';
import { useFilteredProducts } from '@/hooks/useProducts';
import ProductList from './ProductList';
import { usePathname } from 'next/navigation';

export default function FilteredProducts() {
  const pathname = usePathname();
  const { products, error, isLoading, setLike } = useFilteredProducts(pathname);

  return (
    <div className='pb-10'>
      {isLoading && <Loading />}
      <ProductList products={products} setLike={setLike} />
    </div>
  );
}
