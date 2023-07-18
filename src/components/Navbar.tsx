'use client';

import Link from 'next/link';
import ShoppingBagIcon from './icon/ShoppingBagIcon';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from './ui/Button';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';
import CartIcon from './icon/CartIcon';
import PlusIcon from './icon/PlusIcon';
import PlusFillIcon from './icon/PlusFillIcon';
import useSWR from 'swr';
import { DetailUser } from '@/model/user';

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
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const { data, error, isLoading } = useSWR<DetailUser>('/api/me');
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
            <li key={item.herf} className='hover:text-mainColor'>
              <Link href={item.herf} aria-label={item.title}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          {user && (
            <div className='relative flex items-center gap-4'>
              <Link href={`/cart`}>
                <CartIcon />
              </Link>

              {data?.isAdmin && (
                <Link href={`/new`}>
                  {pathName === '/new' ? <PlusFillIcon /> : <PlusIcon />}
                </Link>
              )}

              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
              </Link>
            </div>
          )}

          {session ? (
            <Button text='로그아웃' onClick={() => signOut()} />
          ) : (
            <Button text='로그인' onClick={() => signIn()} />
          )}
        </div>
      </nav>
    </div>
  );
}
