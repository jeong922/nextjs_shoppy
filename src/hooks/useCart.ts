import { CartItem } from '@/service/cart';
import useSWR, { useSWRConfig } from 'swr';

async function updateItem(id: string, quantity: number) {
  return fetch(`/api/cart`, {
    method: 'PUT',
    body: JSON.stringify({ id, quantity }),
  }).then((res) => res.json());
}

export function useCartItems() {
  const {
    data: cartItems,
    isLoading,
    error,
    mutate,
  } = useSWR<CartItem[]>(`/api/cart`);

  const setQuantity = async (item: CartItem, quantity: number) => {
    const newItem = {
      ...item,
      quantity,
    };

    const newItems = cartItems?.map((v) => (v.id === item.id ? newItem : v));

    return mutate(updateItem(item.id, quantity), {
      optimisticData: newItems,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { cartItems, isLoading, error, setQuantity };
}
