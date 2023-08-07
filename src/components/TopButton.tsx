'use client';

import React, { useEffect, useState } from 'react';
import ArrowTopIcon from './icon/ArrowTopIcon';

export default function TopButton() {
  const [showMenu, setShowMenu] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getScrollState = () => {
    window.scrollY >= 100 ? setShowMenu(true) : setShowMenu(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', getScrollState);
    return () => {
      window.removeEventListener('scroll', getScrollState);
    };
  }, []);

  return (
    <>
      {showMenu && (
        <button
          onClick={scrollToTop}
          className='sticky z-10 float-right p-2 bg-white border rounded-full border-neutral-300 right-8 bottom-8 text-neutral-600'
        >
          <ArrowTopIcon />
        </button>
      )}
    </>
  );
}
