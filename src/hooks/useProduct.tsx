import { FullProduct, SimpleProduct } from '@/model/product';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export function useProduct(productId: string) {
  const {
    data: product,
    isLoading,
    error,
    mutate,
  } = useSWR<FullProduct>(`/api/products/${productId}`);
  const setLike = (product: FullProduct, email: string, like: boolean) => {
    const newProduct = {
      ...product,
      likes: like
        ? [...product.likes, email]
        : product.likes.filter((item) => item !== email),
    };

    return mutate(updateLike(product.id, like), {
      optimisticData: newProduct,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { product, isLoading, error, setLike };
}
