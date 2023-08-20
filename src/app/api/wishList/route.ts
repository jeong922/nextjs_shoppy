import { getLikedPostsOf } from '@/service/products';
import { NextRequest, NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

export async function GET(_: NextRequest) {
  return withSessionUser(async (user) => {
    return getLikedPostsOf(user.email).then((data) => NextResponse.json(data));
  });
}
