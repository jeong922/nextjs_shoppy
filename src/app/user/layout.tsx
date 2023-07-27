import Sidebar from '@/components/Sidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col w-full h-screen px-4 pt-32 md:flex-row'>
      <Sidebar />
      <div className='w-full pb-10'>{children}</div>
    </section>
  );
}
