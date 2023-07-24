import Link from 'next/link';
import React from 'react';
import Logo from './ui/Logo';

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

type Props = {
  isShowSideMenu: boolean;
  handleShowSideMenu: () => void;
};

export default function SideMenu({
  isShowSideMenu,
  handleShowSideMenu,
}: Props) {
  return (
    <div
      className={`${
        isShowSideMenu ? 'fixed top-0 left-0 z-40 w-screen h-screen' : 'w-0 h-0'
      } transition ease-in-out bg-neutral-50/10`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleShowSideMenu();
        }
      }}
    >
      <div
        className={`${
          isShowSideMenu ? 'translate-x-0 ' : '-translate-x-52'
        } fixed top-0 left-0 z-30 h-screen bg-white shadow-lg w-52 transition ease-in-out duration-500`}
      >
        <button
          className='flex items-center h-16 px-5'
          onClick={handleShowSideMenu}
        >
          <Logo />
        </button>
        <nav className='flex items-center justify-between w-full py-5'>
          <ul className='items-center w-full uppercase'>
            {menu.map((item) => (
              <li key={item.herf} className='px-5 mb-5 hover:text-mainColor'>
                <Link
                  href={item.herf}
                  aria-label={item.title}
                  className='block '
                  onClick={handleShowSideMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
