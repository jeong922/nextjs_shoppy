import { assetsURL, client, urlFor } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function getDefaultImage() {
  return client.fetch(
    `
    *[_type == "defaultImage"][0]{
      ...,
      "image":photo.asset->url
    }
      `
  );
}

export async function addUser({ id, name, image, email, username }: OAuthUser) {
  return getDefaultImage().then((item) => {
    return client.createIfNotExists({
      _id: id,
      _type: 'user',
      isAdmin: false,
      name,
      email,
      image,
      username,
      address: '',
      phoneNumber: '',
      photo: item.photo,
      likes: [],
    });
  });
}

export async function getUser(userId: string) {
  return client
    .fetch(
      `
  *[_type == "user" && _id == "${userId}"][0] {
    ...,
    "id":_id,
    "likes":likes[]->_id,
  }
  `
    )
    .then((user) => ({
      ...user,
      photo: urlFor(user.photo),
    }));
}

export async function updateUser(
  userId: string,
  name: string | undefined,
  phoneNumber: string | undefined,
  address: string | undefined,
  photo: Blob
) {
  if (photo) {
    return fetch(assetsURL, {
      method: 'POST',
      headers: {
        'content-type': photo.type,
        authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
      },
      body: photo,
    })
      .then((res) => res.json())
      .then((result) => {
        return client
          .patch(userId)
          .set({
            name,
            phoneNumber,
            address,
            photo: { asset: { _ref: result.document._id } },
          })
          .commit();
      });
  } else {
    return client
      .patch(userId)
      .set({
        name,
        phoneNumber,
        address,
      })
      .commit();
  }
}
