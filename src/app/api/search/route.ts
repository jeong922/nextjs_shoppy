import { searchProduct } from '@/service/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return searchProduct().then((data) => NextResponse.json(data));
}
