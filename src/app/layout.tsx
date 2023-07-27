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
            <header className='sticky top-0 z-10'>
              <Navbar />
            </header>
            <main className='flex justify-center w-full h-full max-w-screen-xl pb-10 mx-auto grow pt-28'>
              {children}
            </main>
            {/* <Footer /> */}
          </SWRConfigContext>
        </AuthContext>
      </body>
    </html>
  );
}
