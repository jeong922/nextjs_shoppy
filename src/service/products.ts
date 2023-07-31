import { SimpleProduct } from '@/model/product';
import { assetsURL, client, urlFor } from './sanity';

export async function getProducts(catagory?: string) {
  const result = catagory ? `&& category == "${catagory}"` : '';
  return client
    .fetch(
      `
			*[_type == "product" ${result}] | order(_createdAt desc){
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
    .then(
      (product) =>
        product && {
          ...product,
          likes: product.likes ?? [],
          image: urlFor(product.image),
        }
    );
}

export async function createProduct(
  name: string,
  description: string,
  size: string,
  category: string,
  price: string,
  file: Blob
) {
  return fetch(assetsURL, {
    method: 'POST',
    headers: {
      'content-type': file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: 'product',
          name,
          description,
          size: size.split(','),
          category,
          price: parseInt(price),
          image: { asset: { _ref: result.document._id } },
          likes: [],
        },
        { autoGenerateArrayKeys: true }
      );
    });
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

export async function searchProduct(keyword?: string) {
  const query = keyword
    ? `&& name match "${keyword}*" || (name match "*${keyword}")`
    : '';
  const slice = keyword ? '' : '[0...10]';
  return client
    .fetch(
      `
  *[_type == "product" ${query}]${slice} | order(_createdAt desc) {
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
