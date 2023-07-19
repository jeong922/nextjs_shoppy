type Props = {
  params: {
    username: string;
  };
};

export default function UserPage({ params: { username } }: Props) {
  return <div>{username}</div>;
}
