import { getProduct } from '@/service/products';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  return getProduct(context.params.id).then((data) => NextResponse.json(data));
}
