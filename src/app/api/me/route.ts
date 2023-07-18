import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserByUsername } from '@/service/user';

export async function GET(requset: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getUserByUsername(user.email).then((data) => NextResponse.json(data));
}
