'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen p-3 -top-16'>
      <p className='w-full text-xl text-center text-neutral-500'>
        제품을 찾을 수 없습니다.
      </p>
      <div className='flex flex-col mt-16 sm:flex-row'>
        <button
          className='p-2 mr-0 text-white sm:mr-4 bg-mainColor hover:bg-rose-500'
          onClick={() => router.back()}
        >
          이전 페이지로 돌아가기
        </button>
        <button
          className='p-2 mt-2 text-white bg-mainColor hover:bg-rose-500 sm:mt-0'
          onClick={() => router.push('/')}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
