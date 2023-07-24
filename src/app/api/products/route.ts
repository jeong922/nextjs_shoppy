import { getProducts } from '@/service/products';
import { NextResponse } from 'next/server';

export async function GET(requset: Request) {
  return getProducts().then((data) => NextResponse.json(data));
}
