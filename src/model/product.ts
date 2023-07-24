export type SimpleProduct = {
  id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  likes: string[];
};

export type FullProduct = SimpleProduct & {
  description: string;
  size: string[];
  color: string[];
};
