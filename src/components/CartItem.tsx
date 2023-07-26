import { CartItem } from '@/service/cart';
import Image from 'next/image';
import MinusIcon from './icon/MinusIcon';
import PlusIcon from './icon/PlusIcon';
import Link from 'next/link';

type Props = {
  product: CartItem;
};

export default function CartItem({ product }: Props) {
  return (
    <>
      <td className='flex flex-col p-2 sm:flex-row'>
        <Link href={`/product/${product.productId}`} className='mr-4'>
          <Image
            className='object-cover w-full aspect-square hover:opacity-80'
            src={product.image}
            alt={`photo by ${product.itemName}`}
            width={300}
            height={300}
          />
        </Link>
        <div className='flex flex-col justify-center w-full mt-2'>
          <span className='mb-2 font-semibold'>{product.itemName}</span>
          <span className='text-sm opacity-70'>사이즈 : {product.size}</span>
        </div>
      </td>

      <td className='p-2 inline-table sm:table-cell'>
        <div className='flex items-center justify-center pb-2 mx-2'>
          <span className='mr-2 text-sm sm:hidden inline-table opacity-70'>
            수량
          </span>
          <button
            onClick={() => {}}
            className='cursor-pointer text-neutral-600'
          >
            <MinusIcon />
          </button>
          <span className='mx-2'>{product.quantity}</span>

          <button
            onClick={() => {}}
            className='cursor-pointer text-neutral-600'
          >
            <PlusIcon />
          </button>
        </div>
      </td>

      <td className='relative w-32 p-4 text-center shrink-0'>
        <span>{product.price}원</span>
      </td>

      <td>
        <button onClick={() => {}} className='hover:opacity-70 top-4 right-3'>
          {/* <AiOutlineClose /> */}
        </button>
      </td>
    </>
  );
}
