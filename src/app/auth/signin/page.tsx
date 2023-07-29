import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signin from '@/components/Signin';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <div className='flex flex-col items-center justify-center w-full px-2 pt-32'>
      <h2 className='w-full pb-3 mb-3 text-2xl text-center'>로그인</h2>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </div>
  );
}
