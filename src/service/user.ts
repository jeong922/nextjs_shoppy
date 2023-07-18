import { client } from './sanity';

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
    likes: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `
  *[_type == "user" && username == "${username}"][0] {
    ...,
    "id":_id,
    "likes":likes[]->_id
  }
  `
  );
}
