import { AiFillGithub } from 'react-icons/ai';

type Props = {
  className?: string;
};

export default function GithubIcon({ className }: Props) {
  return <AiFillGithub className={className || 'w-5 h-5'} />;
}
