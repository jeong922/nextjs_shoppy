export function replacePrice(price: number) {
  const formatter = new Intl.NumberFormat('ko');
  return formatter.format(price);
}
