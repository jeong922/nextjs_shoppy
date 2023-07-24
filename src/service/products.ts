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
        "likes": likes[]->email,
			}
      `
    )
    .then((products) =>
      products.map((product: SimpleProduct) => ({
        ...product,
        likes: product.likes ?? [],
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
        "likes": likes[]->email,
			}
      `
    )
    .then((product) => ({
      ...product,
      likes: product.likes ?? [],
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
				"category":category,
				"name":name,
				"image":image,
				"price":price,
        "likes": likes[]->email,
			}
      `
    )
    .then((products) =>
      products.map((product: SimpleProduct) => ({
        ...product,
        likes: product.likes ?? [],
        image: urlFor(product.image),
      }))
    );
}

export async function likeProduct(productId: string, userId: string) {
  return client
    .patch(productId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikeProduct(productId: string, userId: string) {
  return client
    .patch(productId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function getLikedPostsOf(email: string) {
  return client
    .fetch(
      `*[_type == "product" && "${email}" in likes[]->email] {
        ...,
        "id":_id,
				"category":category,
				"name":name,
				"image":image,
				"price":price,
        "likes": likes[]->email,
      }`
    )
    .then((products) =>
      products.map((product: SimpleProduct) => ({
        ...product,
        likes: product.likes ?? [],
        image: urlFor(product.image),
      }))
    );
}
