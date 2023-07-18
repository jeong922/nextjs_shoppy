import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

export async function addUser({ id, name, image, email }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name,
    email,
    image,
    address: '',
    phoneNumber: '',
    likes: [],
  });
}
