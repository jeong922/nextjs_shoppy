import { NextResponse } from 'next/server';
import { getDefaultImage } from '@/service/user';

export async function GET(_: Request) {
  return getDefaultImage().then((data) => NextResponse.json(data));
}
