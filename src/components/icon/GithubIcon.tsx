import { AiFillGithub } from 'react-icons/ai';

type Props = {
  className?: string;
};

export default function GithubIcon({ className = 'w-5 h-5' }: Props) {
  return <AiFillGithub className={className} />;
}
