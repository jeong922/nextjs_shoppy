import React from 'react';
import GithubIcon from './icon/GithubIcon';

export default function Footer() {
  return (
    <footer className='py-3 bg-gray-200 px-7 dark:bg-slate-900'>
      <div className='mx-auto max-w-screen-2xl'>
        <div className='flex justify-between mb-1'>
          <p className='text-xs text-gray-500 dark:text-gray-300'>
            Copyright © jeong922. All Rights Reserved.
          </p>
          <a
            href='https://github.com/jeong922'
            className='flex items-center text-gray-600 hover:text-blue-900 dark:hover:text-blue-500 dark:text-gray-300'
          >
            <GithubIcon />
          </a>
        </div>
        <a
          href='https://github.com/jeong922/next.js_blog'
          className='flex items-center text-xs text-gray-500 hover:text-blue-900 dark:hover:text-blue-500 dark:text-gray-300'
        >
          {/* <GithubIcon /> */}
          {/* {깃허브 주소 들어갈 자리} */}
        </a>
      </div>
    </footer>
  );
}
