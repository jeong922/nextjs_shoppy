'use client';

import Loading from '@/components/Loading';
import ProductCard from '@/components/ui/ProductCard';
import { useLikeProducts } from '@/hooks/useProducts';

export default function WishListPage() {
  const { products, isLoading, error, setLike } = useLikeProducts();
  return (
    <div className='w-full'>
      <>
        {isLoading && <Loading />}
        {products && (
          <ul className='grid max-w-3xl grid-cols-1 gap-3 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} setLike={setLike} />
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
}
