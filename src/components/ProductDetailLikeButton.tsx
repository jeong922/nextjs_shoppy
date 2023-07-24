import { FullProduct, SimpleProduct } from '@/model/product';
import { useSession } from 'next-auth/react';
import LikeButton from './ui/LikeButton';

type Props = {
  product: FullProduct;
  setLike: (product: FullProduct, email: string, like: boolean) => void;
};

export default function ProductDetailLikeButton({ product, setLike }: Props) {
  const { likes } = product;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.email) : false;

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(product, user.email, like);
    }
  };

  return (
    <LikeButton
      title={liked ? 'unlike' : 'like'}
      toggled={liked}
      onToggle={handleLike}
    />
  );
}
