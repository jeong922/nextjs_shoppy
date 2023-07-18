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

// ❗ 처음에 username으로 받아왔는데 username이 중복되어 문제 발생
// 일단 email을 이용했지만 더 좋은 방법 생각해보기
export async function getUserByUsername(email: string) {
  return client.fetch(
    `
  *[_type == "user" && email == "${email}"][0] {
    ...,
    "id":_id,
    "likes":likes[]->_id
  }
  `
  );
}
