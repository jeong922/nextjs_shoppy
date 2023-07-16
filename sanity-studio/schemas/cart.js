// 상품 정보, 수량
export default {
  title: 'Cart',
  name: 'cart',
  type: 'document',
  fields: [
    {
      title: 'Item',
      name: 'item',
      type: 'array',
      type: 'reference',
      to: [{type: 'product'}],
    },
    {
      title: 'User',
      name: 'user',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Count',
      name: 'count',
      type: 'number',
    },
  ],
}
