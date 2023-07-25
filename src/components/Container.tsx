import { FormEvent } from 'react';

type Props = {
  onSubmit?: (e: FormEvent) => void;
  children: React.ReactNode;
  title: string;
};

export default function Container({ onSubmit, children, title }: Props) {
  return (
    <section
      onSubmit={onSubmit}
      className='flex flex-col items-center justify-center w-full p-5 border rounded-md bg-neutral-50/20 '
    >
      <h2 className='w-full pb-3 mb-5 text-lg font-semibold border-b-2 text-neutral-700'>
        {title}
      </h2>
      {children}
    </section>
  );
}
