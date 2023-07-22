export type SimpleProduct = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
};

export type FullProduct = SimpleProduct & {
  description: string;
  size: string[];
  color: string[];
};
