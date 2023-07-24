import { SimpleProduct } from '@/model/product';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

export function useProducts() {
  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR<SimpleProduct[]>('/api/products');
  const setLike = (product: SimpleProduct, email: string, like: boolean) => {
    const newProduct = {
      ...product,
      likes: like
        ? [...product.likes, email]
        : product.likes.filter((item) => item !== email),
    };
    const newProducts = products?.map((v) =>
      v.id === product.id ? newProduct : v
    );

    return mutate(updateLike(product.id, like), {
      optimisticData: newProducts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { products, isLoading, error, setLike };
}

export function useFilteredProducts(category: string) {
  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR<SimpleProduct[]>(`/api/category/${category}`);

  const setLike = (product: SimpleProduct, email: string, like: boolean) => {
    const newProduct = {
      ...product,
      likes: like
        ? [...product.likes, email]
        : product.likes.filter((item) => item !== email),
    };
    const newProducts = products?.map((v) =>
      v.id === product.id ? newProduct : v
    );

    return mutate(updateLike(product.id, like), {
      optimisticData: newProducts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { products, isLoading, error, setLike };
}
