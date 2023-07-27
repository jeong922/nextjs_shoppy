import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Footer from '@/components/Footer';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'J Shop',
    template: 'J Shop | %s',
  },
  description: 'J Shop 쇼핑몰',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='w-full mx-auto overflow-y-scroll'>
        <AuthContext>
          <SWRConfigContext>
            <header className='fixed top-0 z-20 w-full'>
              <Navbar />
            </header>
            <main className='flex justify-center w-full h-full pb-10 mx-auto max-w-screen-2xl grow'>
              {children}
            </main>
            {/* <Footer /> */}
          </SWRConfigContext>
        </AuthContext>
      </body>
    </html>
  );
}
