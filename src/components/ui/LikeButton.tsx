import HeartIcon from '../icon/HeartIcon';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  title: string;
};

export default function LikeButton({ toggled, onToggle, title }: Props) {
  return (
    <button
      aria-label={title}
      onClick={() => onToggle(!toggled)}
      className={`${toggled ? 'text-red-600' : 'text-neutral-300'}`}
    >
      <HeartIcon />
    </button>
  );
}
