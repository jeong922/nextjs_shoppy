import Link from 'next/link';
import ArrowRightIcon from './icon/ArrowRightIcon';

const menu = [
  {
    herf: 'profile',
    title: '회원정보 수정',
  },
  {
    herf: 'wishList',
    title: '위시리스트',
  },
];

export default function Sidebar() {
  return (
    <nav className='w-full p-5 mb-5 mr-10 border rounded-md bg-neutral-100/20 shrink-0 min-h-96 md:w-52'>
      <h2 className='w-full pb-3 mb-5 font-semibold border-b-2 text-neutral-700'>
        나의 활동 정보
      </h2>
      <ul className='flex w-full uppercase md:flex-col'>
        {menu.map((item) => (
          <li key={item.herf} className='mr-4'>
            <Link
              href={`/user/${item.herf}`}
              className='flex items-center justify-between w-full md:mb-5 hover:text-mainColor text-neutral-600'
            >
              <span>{item.title}</span>
              <ArrowRightIcon />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
