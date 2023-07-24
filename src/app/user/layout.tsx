import Sidebar from '@/components/Sidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col w-full p-4 md:flex-row'>
      <Sidebar />
      <div className='max-w-3xl'>{children}</div>
    </section>
  );
}
