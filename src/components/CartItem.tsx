import { CartItem } from '@/service/cart';
import Image from 'next/image';
import MinusIcon from './icon/MinusIcon';
import PlusIcon from './icon/PlusIcon';
import Link from 'next/link';
import { useCartItems } from '@/hooks/useCart';
import CloseIcon from './icon/CloseIcon';
import { replacePrice } from '@/util/util';

type Props = {
  product: CartItem;
};

export default function CartItem({ product }: Props) {
  const { setQuantity, delteItem } = useCartItems();

  const handleMinus = () => {
    if (product.quantity < 2) {
      return;
    }
    setQuantity(product, product.quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(product, product.quantity + 1);
  };

  const removeItem = () => {
    delteItem(product.id);
  };

  return (
    <>
      <td className='flex flex-col p-2 sm:flex-row'>
        <Link href={`/product/${product.productId}`} className='relative mr-4'>
          <Image
            className='object-cover h-full hover:opacity-80 aspect-square'
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
        <div className='flex items-center justify-center pb-2 mx-2 sm:pb-0'>
          <span className='mr-2 text-sm sm:hidden inline-table opacity-70'>
            수량
          </span>
          <button
            onClick={handleMinus}
            className='cursor-pointer text-neutral-600'
          >
            <MinusIcon />
          </button>
          <span className='mx-2'>{product.quantity}</span>

          <button
            onClick={handlePlus}
            className='cursor-pointer text-neutral-600'
          >
            <PlusIcon />
          </button>
        </div>
      </td>

      <td className='relative w-24 p-2 text-center sm:w-32 shrink-0'>
        <span>{replacePrice(product.price)}원</span>
      </td>

      <td className='relative text-center shrink-0'>
        <button onClick={removeItem} className=' text-neutral-600'>
          <CloseIcon />
        </button>
      </td>
    </>
  );
}
