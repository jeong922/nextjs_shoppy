import { getProducts } from '@/service/products';
import { NextResponse } from 'next/server';

type Context = {
  params: { category: string };
};

export async function GET(requset: Request, context: Context) {
  return getProducts(context.params.category).then((data) =>
    NextResponse.json(data)
  );
}
