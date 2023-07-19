type AvatarSize = 'small' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
};

export default function Avatar({ image, size = 'small' }: Props) {
  return (
    <div className={`object-cover rounded-full ${getImageSize(size)}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt='user profile'
        className={'rounded-full w-full h-full'}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getImageSize(size: AvatarSize) {
  switch (size) {
    case 'small':
      return 'w-7 h-7';
    case 'large':
      return 'w-40 h-40';
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
