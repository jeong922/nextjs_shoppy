import { SimpleProduct } from '@/model/product';
import ProductCard from './ui/ProductCard';

type Props = {
  products: SimpleProduct[] | undefined;
  setLike: (product: SimpleProduct, email: string, like: boolean) => void;
};

export default function ProductList({ products, setLike }: Props) {
  return (
    <>
      {products && (
        <ul className='grid grid-cols-1 gap-3 px-4 pt-2 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4'>
          {products.map((product: SimpleProduct, index) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                setLike={setLike}
                priority={index < 2}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
