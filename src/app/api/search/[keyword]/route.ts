import { searchProduct } from '@/service/products';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return searchProduct(context.params.keyword).then((data) =>
    NextResponse.json(data)
  );
}
