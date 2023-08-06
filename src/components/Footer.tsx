import React from 'react';
import GithubIcon from './icon/GithubIcon';

export default function Footer() {
  return (
    <footer className='relative py-3 transform translate-y-full bg-gray-200 px-7'>
      <div className='mx-auto max-w-screen-2xl'>
        <div className='flex justify-between mb-1'>
          <p className='text-xs text-gray-500'>
            Copyright © jeong922. All Rights Reserved.
          </p>
          <a
            href='https://github.com/jeong922'
            className='flex items-center text-gray-600 hover:text-mainColor'
          >
            <GithubIcon />
          </a>
        </div>
        <a
          href='https://github.com/jeong922/nextjs_shoppy'
          className='flex items-center text-xs text-gray-500 hover:text-mainColor'
        >
          <GithubIcon />
          <span className='ml-2'>
            https://github.com/jeong922/nextjs_shoppy
          </span>
        </a>
      </div>
    </footer>
  );
}
