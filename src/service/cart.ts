import { client, urlFor } from './sanity';

export type CartItem = {
  id: string;
  author: string;
  price: string;
  image: string;
  createdAt: string;
  category: string;
  size: string;
  itemName: string;
  quantity: number;
  productId: string;
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
      "itemName":item->name,
      "quantity":count,
      "productId":item->_id,
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
