import { SimpleProduct } from '@/model/product';
import useSWR from 'swr';
import ProductCard from './ui/ProductCard';

type Props = {
  pathname: string;
};

export default function FilteredProducts({ pathname }: Props) {
  const getCategory = () => {
    switch (pathname) {
      case '/women':
        return 'women';
      case '/men':
        return 'men';
      case '/acc-shoes':
        return 'etc';
    }
  };

  const {
    data: products,
    error,
    isLoading,
  } = useSWR<SimpleProduct[]>(`/api/category/${getCategory()}`);

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
