import { SimpleProduct } from '@/model/product';
import Image from 'next/image';
import Link from 'next/link';
import ProductLikeButton from '../ProductLikeButton';
import HeartFillIcon from '../icon/HeartFillIcon';
import { replacePrice } from '@/util/util';

type Props = {
  product: SimpleProduct;
  setLike: (product: SimpleProduct, email: string, like: boolean) => void;
};

export default function ProductCard({ product, setLike }: Props) {
  const { name, image, price, id, likes } = product;

  return (
    <div className='relative'>
      <div className='absolute z-10 bottom-28 right-4'>
        <ProductLikeButton product={product} setLike={setLike} />
      </div>

      <Link className='group' href={`/product/${id}`}>
        <Image
          className='object-cover w-full cursor-pointer aspect-square group-hover:opacity-80'
          src={image}
          alt={`photo by ${name}`}
          width={500}
          height={500}
        />

        <div className='flex flex-col py-5'>
          <span className='text-neutral-800'>{name}</span>
          <span className='font-semibold'>{replacePrice(price)}원</span>
          <div className='flex items-center gap-1 text-sm text-neutral-400'>
            <HeartFillIcon />
            {likes.length}
          </div>
        </div>
      </Link>
    </div>
  );
}
