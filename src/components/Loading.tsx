export default function Loading() {
  return (
    <div className='fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-white'>
      <div className='relative w-16 h-16 border-4 border-black border-solid rounded-full opacity-10 '></div>
      <div className='absolute w-16 h-16 border-b-4 border-r-4 border-solid rounded-full border-mainColor opacity-70 animate-spin'></div>
    </div>
  );
}
