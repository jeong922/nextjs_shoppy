import ProductDetail from '@/components/ProductDetail';

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
