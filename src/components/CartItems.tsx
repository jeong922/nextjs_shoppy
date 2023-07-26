'use client';

import useSWR from 'swr';

export default function CartItems() {
  const { data, isLoading, error } = useSWR('/api/cart');
  console.log(data);
  return <div>cart</div>;
}
