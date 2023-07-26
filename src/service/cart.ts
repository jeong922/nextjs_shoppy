import { client, urlFor } from './sanity';

type CartItem = {
  id: string;
  author: string;
  price: string;
  image: string;
  createdAt: string;
  category: string;
};

export async function getCartItems(userId: string) {
  return client
    .fetch(
      `
		*[_type == "cart" && user->_id =="${userId}"] {
			...,
			"id":_id,
			"author":user->_id,
			"price":item->price,
			"image":item->image,
			"createdAt":_createdAt,
			"category":item->category,
		}
		`
    )
    .then((items) =>
      items.map((item: CartItem) => ({
        ...item,
        image: urlFor(item.image),
      }))
    );
}
