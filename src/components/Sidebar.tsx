import ArrowRightIcon from './icon/ArrowRightIcon';

const menu = [
  {
    herf: '/profile',
    title: '회원정보 수정',
  },
  {
    herf: '/profile',
    title: '위시리스트',
  },
];

export default function Sidebar() {
  return (
    <section className='p-5 mr-10 border rounded-md w-52 bg-neutral-100/20'>
      <h2 className='w-full pb-3 mb-5 font-semibold border-b-2 text-neutral-700'>
        나의 활동 정보
      </h2>
      <ul className='w-full uppercase'>
        {menu.map((item) => (
          <li
            key={item.herf}
            className='flex items-center justify-between mb-5 hover:text-mainColor text-neutral-600'
          >
            <span>{item.title}</span>
            <ArrowRightIcon />
          </li>
        ))}
      </ul>
    </section>
  );
}
