import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getCartItems, updateCartItem } from '@/service/cart';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(requset: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getCartItems(user.id).then((data) => NextResponse.json(data));
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const data = await req.json();

  if (!data.id || data.quantity === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  return updateCartItem(data.id, data.quantity)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
