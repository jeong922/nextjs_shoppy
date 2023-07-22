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
import { useEffect, useState } from 'react';

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
  const [isScroll, setIsScroll] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const user = session?.user;
  const { data, error, isLoading } = useSWR<DetailUser>('/api/me');

  const getScrollState = () => {
    if (window.scrollY >= 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', getScrollState);
    return () => {
      window.removeEventListener('scroll', getScrollState);
    };
  });
  console.log(isShowMenu);
  return (
    <div className={`${isScroll && 'bg-neutral-50'} h-16`}>
      <div className={`flex items-center px-6 mx-auto max-w-screen-2xl h-16`}>
        <Link
          href='/'
          className='flex items-center justify-center mr-6 text-2xl font-semibold cursor-pointer shrink-0'
          aria-label='Home'
        >
          <ShoppingBagIcon />
          <h1>J Shop</h1>
        </Link>

        <nav className='flex items-center justify-between w-full h-full'>
          <ul className='flex items-center gap-4 uppercase'>
            {menu.map((item) => (
              <li key={item.herf} className='hover:text-mainColor'>
                <Link href={item.herf} aria-label={item.title}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className='flex items-center'>
            {user && (
              <div className='relative flex items-center gap-4'>
                <div
                  className='relative flex items-center justify-center h-16'
                  onMouseEnter={() => setIsShowMenu(true)}
                  onMouseLeave={() => setIsShowMenu(false)}
                >
                  <div className='cursor-pointer'>
                    <Avatar image={data?.photo ? data.photo : user.image} />
                  </div>
                  <ul
                    className={`${
                      isShowMenu
                        ? 'absolute flex flex-col items-center justify-center py-3 text-sm rounded-md border bg-white whitespace-nowrap text-neutral-700 z-20 top-14'
                        : 'hidden'
                    }`}
                  >
                    <li className='px-2 py-1 mb-1 hover:text-mainColor hover:font-semibold'>
                      <Link href={'/profile'}>마이페이지</Link>
                    </li>
                    <li className='px-2 py-1 hover:text-mainColor hover:font-semibold'>
                      <button onClick={() => signOut()}>로그아웃</button>
                    </li>
                  </ul>
                </div>

                <Link href='/cart'>
                  <CartIcon />
                </Link>

                {data?.isAdmin && (
                  <Link href='/new'>
                    {pathName === '/new' ? <PlusFillIcon /> : <PlusIcon />}
                  </Link>
                )}

                {/* <Link href='/profile'>
                  <Avatar image={data?.photo ? data.photo : user.image} />
                </Link> */}
              </div>
            )}

            {!session && <Button text='로그인' onClick={() => signIn()} />}
          </div>
        </nav>
      </div>
    </div>
  );
}
