type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className='object-cover rounded-full w-7 h-7'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt='user profile'
        className={'rounded-full'}
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
