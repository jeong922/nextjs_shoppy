import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getProducts } from '@/service/products';
import { NextResponse } from 'next/server';

export async function GET(requset: Request) {
  // const session = await getServerSession(authOptions);
  // const user = session?.user;

  // if (!user) {
  //   return new Response('Authentication Error', { status: 401 });
  // }

  return getProducts().then((data) => NextResponse.json(data));
}
