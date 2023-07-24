// 제품명, 색상, 사이즈, 카테고리, 가격, 제품 설명, 제품 이미지, 성별
export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Color',
      name: 'color',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Size',
      name: 'size',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Category',
      name: 'category',
      type: 'string',
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
}
