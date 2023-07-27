import { createProduct, getProducts } from '@/service/products';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(requset: Request) {
  return getProducts().then((data) => NextResponse.json(data));
}

export async function POST(req: Request) {
  const form = await req.formData();
  const name = form.get('name')?.toString();
  const description = form.get('description')?.toString();
  const size = form.get('size')?.toString();
  const category = form.get('category')?.toString();
  const price = form.get('price')?.toString();
  const file = form.get('file') as Blob;

  if (
    !name ||
    !description ||
    !size ||
    !category ||
    !price ||
    file === undefined
  ) {
    return new Response('Bad Request', { status: 400 });
  }

  return createProduct(name, description, size, category, price, file).then(
    (data) => NextResponse.json(data)
  );
}
