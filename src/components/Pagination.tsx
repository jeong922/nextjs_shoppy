type Props = {
  itemSize: number;
  setSlideIndex: (index: number) => void;
  slideIndex: number;
};

export default function Pagination({
  itemSize,
  setSlideIndex,
  slideIndex,
}: Props) {
  const paginationHandler = (index: number) => {
    setSlideIndex(index + 2);
  };
  return (
    <div className='absolute z-10 flex justify-center w-full px-4 mt-3 bottom-2'>
      <ul className='flex'>
        {Array.from({ length: itemSize }, (_, i) => i).map((item) => (
          <li
            key={item}
            className='w-3 h-3 rounded-full bg-transparent border border-[rgba(255,255,255,0.4)] mx-1 hover:border-[rgba(255,255,255,0.9)] hover:cursor-pointer'
            style={{
              border: `${
                slideIndex === item + 2
                  ? ' 1px solid rgba(255,255,255,0.9)'
                  : ''
              }`,
            }}
            onClick={() => paginationHandler(item)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
