import { CartItem } from '@/service/cart';
import useSWR, { useSWRConfig } from 'swr';

async function updateItem(id: string, quantity?: number) {
  return fetch(`/api/cart`, {
    method: 'PUT',
    body: JSON.stringify({ id, quantity }),
  }).then((res) => res.json());
}

async function addCartItem(id: string, productId: string, size: string) {
  return fetch(`/api/cart`, {
    method: 'POST',
    body: JSON.stringify({ id, productId, size }),
  }).then((res) => res.json());
}

async function delteCartItem(id: string, quantity?: number) {
  return fetch(`/api/cart`, {
    method: 'DELETE',
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

  const { mutate: globalMutate } = useSWRConfig();

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

  const delteItem = async (cartId: string) => {
    const newItems = cartItems?.filter((v) => v.id !== cartId);

    return mutate(delteCartItem(cartId), {
      optimisticData: newItems,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const addItem = (id: string, productId: string, size: string) => {
    addCartItem(id, productId, size);
  };

  return { cartItems, isLoading, error, setQuantity, delteItem, addItem };
}
