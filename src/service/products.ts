import { SimpleProduct } from '@/model/product';
import { client, urlFor } from './sanity';

export async function getProducts() {
  return client
    .fetch(
      `
			*[_type == "product"]{
				...,
				"id":_id,
				"category":category,
				"name":name,
				"image":image,
				"price":price,
			}
      `
    )
    .then((products) =>
      products.map((product: SimpleProduct) => ({
        ...product,
        image: urlFor(product.image),
      }))
    );
}
