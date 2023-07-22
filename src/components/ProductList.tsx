'use client';

import ProductCard from '@/components/ui/ProductCard';
import { SimpleProduct } from '@/model/product';
import useSWR from 'swr';
export default function ProductList() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<SimpleProduct[]>('/api/products');
  console.log(products);
  return (
    <div>
      {products && (
        <ul className='grid grid-cols-1 gap-3 px-2 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
