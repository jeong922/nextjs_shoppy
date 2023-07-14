import Link from 'next/link';
import ShoppingBagIcon from './icon/ShoppingBagIcon';

const menu = [
  {
    herf: '/women',
    title: 'women',
  },
  {
    herf: '/men',
    title: 'men',
  },
  {
    herf: '/acc-shoes',
    title: 'acc&shoes',
  },
];

export default function Navbar() {
  return (
    <div className='flex items-center px-6 py-5 mx-auto max-w-screen-2xl'>
      <Link
        href='/'
        className='flex items-center justify-center mr-6 text-2xl font-semibold cursor-pointer shrink-0'
        aria-label='Home'
      >
        <ShoppingBagIcon />
        <h1>J Shop</h1>
      </Link>

      <nav className='flex items-center justify-between w-full'>
        <ul className='flex items-center gap-4 uppercase'>
          {menu.map((item) => (
            <li key={item.herf} className='hover:opacity-70'>
              <Link href={item.herf} aria-label={item.title}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href='/login'>로그인</Link>
      </nav>
    </div>
  );
}
