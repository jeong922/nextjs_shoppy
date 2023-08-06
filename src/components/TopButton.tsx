'use client';

import React, { useState } from 'react';
import ArrowTopIcon from './icon/ArrowTopIcon';

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className='sticky z-10 float-right p-2 bg-white border rounded-full border-neutral-300 right-8 bottom-8 text-neutral-600'
    >
      <ArrowTopIcon />
    </button>
  );
}
