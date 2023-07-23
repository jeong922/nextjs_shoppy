'use client';

import { usePathname } from 'next/navigation';
import FilteredProducts from './FilteredProducts';

export default function Products() {
  const pathname = usePathname();
  return (
    <div>
      <FilteredProducts pathname={pathname} />
    </div>
  );
}
