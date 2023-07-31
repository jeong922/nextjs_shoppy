import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type Props = {
  direction: 'left' | 'right';
  onClick: () => void;
};

export default function BannerButton({ direction, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${direction === 'right' ? 'right-0' : 'left-0'} 
        absolute h-full bg-transparent z-10 cursor-pointer px-2
      `}
      aria-label={direction}
    >
      {direction === 'left' ? (
        <MdKeyboardArrowLeft className='text-3xl sm:text-6xl text-neutral-100' />
      ) : (
        <MdKeyboardArrowRight className='text-3xl sm:text-6xl text-neutral-100' />
      )}
    </button>
  );
}
