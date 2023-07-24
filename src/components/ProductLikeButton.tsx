import { useState } from 'react';
import HeartIcon from './icon/HeartIcon';
import { SimpleProduct } from '@/model/product';
import { useSession } from 'next-auth/react';

type Props = {
  product: SimpleProduct;
};

export default function ProductLikeButton({ product }: Props) {
  const { id, likes } = product;
  const { data: session } = useSession();
  const user = session?.user;
  const [liked, setLiked] = useState(user ? likes.includes(user.email) : false);

  const handleLike = (like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => setLiked(like));
  };

  return (
    <button
      onClick={() => handleLike(!liked)}
      className={`${liked ? 'text-red-600' : 'text-neutral-300'}`}
    >
      <HeartIcon />
    </button>
  );
}
