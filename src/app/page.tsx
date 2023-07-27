import AllProductList from '@/components/AllProductList';
import Banner from '@/components/Banner';

export default function HomePage() {
  return (
    <section className='relative flex flex-col w-full max-w-screen-2xl -top-16'>
      <Banner />
      <AllProductList />
    </section>
  );
}
