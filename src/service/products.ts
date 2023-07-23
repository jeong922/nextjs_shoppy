import { FullProduct, SimpleProduct } from '@/model/product';
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

export async function getProduct(productId: string) {
  return client
    .fetch(
      `
			*[_type == "product" && _id == "${productId}"][0]{
				...,
				"id":_id,
			}
      `
    )
    .then((product) => ({
      ...product,
      image: urlFor(product.image),
    }));
}

export async function getCategoryOfProduct(catagory: string) {
  return client
    .fetch(
      `
			*[_type == "product" && category == "${catagory}"]{
				...,
				"id":_id,
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
