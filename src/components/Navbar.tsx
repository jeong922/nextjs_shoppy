'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from './ui/Button';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';
import CartIcon from './icon/CartIcon';
import useSWR from 'swr';
import { DetailUser } from '@/model/user';
import { useEffect, useState } from 'react';
import MenuIcon from './icon/MenuIcon';
import SideMenu from './SideMenu';
import Logo from './ui/Logo';
import PlusSquareFillIcon from './icon/PlusSquareFillIcon';
import PlusSquareIcon from './icon/PlusSquareIcon';
import CartFillIcon from './icon/CartFillIcon';

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
  const [isShowSideMenu, setIsShowSideMenu] = useState(false);
  const user = session?.user;
  const { data } = useSWR<DetailUser>('/api/me');

  const getScrollState = () => {
    if (window.scrollY >= 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  const handleShowSideMenu = () => {
    isShowSideMenu ? setIsShowSideMenu(false) : setIsShowSideMenu(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', getScrollState);
    return () => {
      window.removeEventListener('scroll', getScrollState);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 640) {
        setIsShowSideMenu(false);
      }
      return () => {
        window.removeEventListener('resize', () => {
          if (window.innerWidth > 640) {
            setIsShowSideMenu(false);
          }
        });
      };
    });
  }, []);

  useEffect(() => {
    if (isShowSideMenu) {
      document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isShowSideMenu]);

  return (
    <div
      className={` ${
        pathName === '/'
          ? `${isScroll ? 'bg-neutral-50/80 text-black' : 'text-neutral-50'}`
          : 'text-black bg-neutral-50'
      } h-16 transform duration-300 `}
    >
      <div
        className={`flex items-center px-6 mx-auto max-w-screen-2xl h-16 w-full justify-between`}
      >
        <button
          className='block mr-2 cursor-pointer sm:hidden'
          onClick={handleShowSideMenu}
        >
          <MenuIcon />
        </button>

        <Logo />
        <SideMenu
          isShowSideMenu={isShowSideMenu}
          handleShowSideMenu={handleShowSideMenu}
        />
        <nav className='flex items-center justify-between w-full'>
          <ul className='items-center hidden gap-4 uppercase sm:flex'>
            {menu.map((item) => (
              <li key={item.herf} className='hover:text-mainColor'>
                <Link href={item.herf} aria-label={item.title}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center min-w-fit'>
          {session ? (
            <div className='relative flex items-center gap-4'>
              <div
                className='relative flex items-center justify-center h-16'
                onMouseEnter={() => setIsShowMenu(true)}
                onMouseLeave={() => setIsShowMenu(false)}
              >
                <div
                  className='cursor-pointer'
                  onClick={() =>
                    isShowMenu ? setIsShowMenu(false) : setIsShowMenu(true)
                  }
                >
                  <Avatar
                    image={
                      data?.photo ? data.photo : './images/profile_image.png'
                    }
                  />
                </div>
                <ul
                  className={`${
                    isShowMenu ? 'visible' : 'invisible'
                  } absolute flex flex-col items-center justify-center py-3 text-sm rounded-md border bg-white whitespace-nowrap text-neutral-700 z-20 top-14`}
                >
                  <li className='px-2 py-1 mb-1 hover:text-mainColor hover:font-semibold'>
                    <Link href={'/user/profile'}>마이페이지</Link>
                  </li>
                  <li className='px-2 py-1 hover:text-mainColor hover:font-semibold'>
                    <button onClick={() => signOut()}>로그아웃</button>
                  </li>
                </ul>
              </div>

              <Link href='/cart'>
                {pathName === '/cart' ? <CartFillIcon /> : <CartIcon />}
              </Link>

              {data?.isAdmin && (
                <Link href='/new'>
                  {pathName === '/new' ? (
                    <PlusSquareFillIcon />
                  ) : (
                    <PlusSquareIcon />
                  )}
                </Link>
              )}
            </div>
          ) : (
            <Button text='로그인' onClick={() => signIn()} />
          )}
        </div>
      </div>
    </div>
  );
}
