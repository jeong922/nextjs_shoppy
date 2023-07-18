type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      className='px-3 py-1 text-sm text-white rounded-lg bg-mainColor hover:bg-rose-500 shrink-0'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
