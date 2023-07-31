import ProductDetail from '@/components/ProductDetail';
import { getProduct } from '@/service/products';
import { Metadata } from 'next';

type Props = {
  params: {
    productId: string;
  };
};

export default function page({ params: { productId } }: Props) {
  return (
    <div>
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
