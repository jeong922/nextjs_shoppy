import Link from 'next/link';
import ShoppingBagIcon from '../icon/ShoppingBagIcon';

export default function Logo() {
  return (
    <Link
      href='/'
      className='flex items-center justify-center mr-6 text-2xl font-semibold cursor-pointer shrink-0'
      aria-label='Home'
    >
      <ShoppingBagIcon styles='text-mainColor' />
      <h1 className='ml-2'>J Shop</h1>
    </Link>
  );
}
