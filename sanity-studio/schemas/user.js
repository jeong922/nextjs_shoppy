// 이름 아이디 이메일 이미지 주소 전화번호
export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'IsAdmin',
      name: 'isAdmin',
      type: 'boolean',
    },
    {
      title: 'Username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'string',
    },
    {
      title: 'PhoneNumber',
      name: 'phoneNumber',
      type: 'string',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
}
