'use client';
import { useEffect, useRef, useState } from 'react';
import BannerButton from './BannerButton';
import Pagination from './Pagination';
import Image from 'next/image';

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<any>(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Banner() {
  const items = [
    { data: '/img/b1.jpg', id: 1, text: 'J Shop' },
    { data: '/img/b2.jpg', id: 2, text: 'denim collection' },
    { data: '/img/b4.jpg', id: 3, text: 'knitwear' },
  ];
  const DATA_COUNT = 2;
  const transitionTime = 300;
  const itemSize = items.length;
  const transitionStyle = `transform ${transitionTime}ms ease-in-out 0s`;
  const [slideIndex, setSlideIndex] = useState(DATA_COUNT);
  const [stop, setStop] = useState<any>(4000);
  const [slideTransition, setTransition] = useState(transitionStyle);

  const replaceSlide = (index: number) => {
    setTimeout(() => {
      setTransition('');
      setSlideIndex(index);
    }, transitionTime);
  };

  const slideHandler = (direction: number) => {
    let index = slideIndex + direction;
    setSlideIndex(index);
    if (index - DATA_COUNT < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - DATA_COUNT >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  const cloneSlide = () => {
    const front = [];
    const back = [];
    let index = 0;

    while (index < DATA_COUNT) {
      back.push(items[index % items.length]);
      front.push(items[items.length - 1 - (index % items.length)]);
      index++;
    }
    return [...front, ...items, ...back];
  };

  const getItemIndex = (index: number) => {
    index -= DATA_COUNT;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  };

  useInterval(() => {
    slideHandler(1);
  }, stop);

  return (
    <div
      className='flex justify-center mb-5'
      onMouseEnter={() => setStop(null)}
      onMouseLeave={() => setStop(4000)}
    >
      <div className='relative overflow-hidden'>
        <div className='relative select-none'>
          <BannerButton direction='left' onClick={() => slideHandler(-1)} />
          <BannerButton direction='right' onClick={() => slideHandler(1)} />
          <div className='relative overflow-hidden'>
            <div
              className='relative top-0 flex left-1/2 w-fit'
              style={{
                transform: `translateX(${
                  (-100 / cloneSlide().length) * (0.5 + slideIndex)
                }%)`,
                transition: slideTransition,
              }}
            >
              {cloneSlide().map((item, index) => {
                const itemIndex = getItemIndex(index);
                return (
                  <div
                    key={index}
                    className='relative items-center justify-center h-[26rem] w-screen'
                  >
                    <Image
                      className='z-20 object-cover w-full h-full select-none opacity-90'
                      src={items[itemIndex].data}
                      alt={`${items[itemIndex].text}`}
                      width={800}
                      height={800}
                      priority
                    />
                    <div className='absolute inset-0 flex items-center justify-center text-center delay-300 transform text-neutral-100'>
                      <span className='text-2xl font-semibold uppercase md:text-4xl'>
                        {item.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination
          itemSize={itemSize}
          setSlideIndex={setSlideIndex}
          slideIndex={slideIndex}
        />
      </div>
    </div>
  );
}
