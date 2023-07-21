import { assetsURL, client, urlFor } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, name, image, email, username }: OAuthUser) {
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
    photo: '',
    likes: [],
  });
}

// ❗ 처음에 username으로 받아왔는데 username이 중복되어 문제 발생
// 일단 email을 이용했지만 더 좋은 방법 생각해보기
export async function getUserByUsername(email: string) {
  return client
    .fetch(
      `
  *[_type == "user" && email == "${email}"][0] {
    ...,
    "id":_id,
    "likes":likes[]->_id,
    "photo":photo
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
