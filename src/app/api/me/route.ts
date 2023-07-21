import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserByUsername, updateUser } from '@/service/user';

export async function GET(requset: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getUserByUsername(user.email).then((data) => NextResponse.json(data));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const form = await req.formData();
  const name = form.get('name')?.toString();
  const phoneNumber = form.get('phoneNumber')?.toString();
  const address = form.get('address')?.toString();
  const file = form.get('photo') as Blob;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return updateUser(user.id, name, phoneNumber, address, file).then((data) =>
    NextResponse.json(data)
  );
}
