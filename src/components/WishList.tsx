'use client';
import Container from './Container';
import Loading from './Loading';
import { useLikeProducts } from '@/hooks/useProducts';
import ProductCard from './ui/ProductCard';

export default function WishList() {
  const { products, isLoading, error, setLike } = useLikeProducts();

  return (
    <Container title='위시리스트'>
      {isLoading && <Loading />}
      <div>
        {products && products.length < 1 && (
          <div className='flex flex-col items-center justify-center h-96'>
            <span>좋아요한 상품이 없어요.</span>
            <span>관심있는 상품을 담아보세요.</span>
          </div>
        )}

        {products && (
          <ul className='grid grid-cols-1 gap-3 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} setLike={setLike} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
