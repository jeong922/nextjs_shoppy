import AllProductList from '@/components/AllProductList';
import Banner from '@/components/Banner';

export default function HomePage() {
  return (
    <section className='flex flex-col w-full'>
      <Banner />
      <AllProductList />
    </section>
  );
}
