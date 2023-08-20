import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { getUser, updateUser } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function GET(_: Request) {
  return withSessionUser(async (user) => {
    return getUser(user.id).then((data) => NextResponse.json(data));
  });
}

export async function POST(req: Request) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const name = form.get('name')?.toString();
    const phoneNumber = form.get('phoneNumber')?.toString();
    const address = form.get('address')?.toString();
    const file = form.get('photo') as Blob;

    return updateUser(user.id, name, phoneNumber, address, file).then((data) =>
      NextResponse.json(data)
    );
  });
}
