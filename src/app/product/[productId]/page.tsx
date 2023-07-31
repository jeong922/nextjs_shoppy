import ProductDetail from '@/components/ProductDetail';
import { getProduct as getDetailProduct } from '@/service/products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: {
    productId: string;
  };
};

const getProduct = cache(async (productId: string) =>
  getDetailProduct(productId)
);

export default async function ProductDetailPage({
  params: { productId },
}: Props) {
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className='w-full px-4 pt-32'>
      <ProductDetail productId={productId} />
    </div>
  );
}

export async function generateMetadata({
  params: { productId },
}: Props): Promise<Metadata> {
  const product = await getProduct(productId);
  return {
    title: `${product?.name}`,
    description: `${product?.name} 상세 정보`,
  };
}
