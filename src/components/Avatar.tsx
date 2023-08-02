type AvatarSize = 'small' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
};

export default function Avatar({ image, size = 'small' }: Props) {
  return (
    <div className={`rounded-full ${getImageSize(size)}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? '/images/profile_image.png'}
        alt='user profile'
        className={'object-cover rounded-full w-full h-full'}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}

function getImageSize(size: AvatarSize) {
  switch (size) {
    case 'small':
      return 'w-8 h-8';
    case 'large':
      return 'w-40 h-40';
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
