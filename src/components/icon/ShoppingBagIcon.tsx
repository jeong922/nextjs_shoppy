import { CgShoppingBag } from 'react-icons/cg';

type Props = {
  styles?: string;
};

export default function ShppingBagIcon({ styles }: Props) {
  return <CgShoppingBag className={`${styles}`} />;
}
