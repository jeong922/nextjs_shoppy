// 상품 정보, 수량
export default {
  title: 'Cart',
  name: 'cart',
  type: 'document',
  fields: [
    {
      title: 'User',
      name: 'user',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Item',
      name: 'item',
      type: 'array',
      type: 'reference',
      to: [{type: 'product'}],
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
    },
    {
      title: 'Quantity',
      name: 'quantity',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'item.name',
      authorName: 'user.name',
      media: 'item.image',
    },
    prepare(selection) {
      const {title, authorName, media} = selection
      return {
        title,
        subtitle: `by ${authorName}`,
        media,
      }
    },
  },
}
