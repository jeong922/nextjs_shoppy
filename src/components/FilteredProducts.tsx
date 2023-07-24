import ProductCard from './ui/ProductCard';
import Loading from './Loading';
import { useFilteredProducts } from '@/hooks/useProducts';

type Props = {
  pathname: string;
};

export default function FilteredProducts({ pathname }: Props) {
  const { products, error, isLoading, setLike } = useFilteredProducts(pathname);

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
