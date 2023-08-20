import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '@/service/cart';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function GET(_: Request) {
  return withSessionUser(async (user) => {
    return getCartItems(user.id).then((data) => NextResponse.json(data));
  });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  if (!data.id || data.quantity === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  return updateCartItem(data.id, data.quantity)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  if (!data.id) {
    return new Response('Bad Request', { status: 400 });
  }

  return deleteCartItem(data.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const data = await req.json();

    if (!data.id) {
      return new Response('Bad Request', { status: 400 });
    }

    return addCartItem(user.id, data.productId, data.size).then((res) =>
      NextResponse.json(res)
    );
  });
}
