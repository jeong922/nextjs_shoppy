import { DetailUser } from '@/model/user';
import Avatar from './Avatar';
import Button from './ui/Button';
import useSWR from 'swr';

export default function Profile() {
  const { data, error, isLoading } = useSWR<DetailUser>('/api/me');
  console.log(data);
  return (
    <section className='flex flex-col items-center justify-center'>
      <h2 className='w-full pb-3 mb-5 text-lg font-semibold text-center border-b-2'>
        회원정보 수정
      </h2>
      <div className='flex'>
        <div className='pt-4 mr-10'>
          <Avatar image={data?.image} size='large' />
        </div>
        <form className='flex flex-col justify-between'>
          <div className='mb-4'>
            <label htmlFor='name' className='inline-block w-24 mr-4'>
              이름
            </label>
            <input
              id='name'
              type='text'
              value={data?.name}
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='inline-block w-24 mr-4'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              value={data?.email}
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              readOnly
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='phoneNumber' className='inline-block w-24 mr-4'>
              전화번호
            </label>
            <input
              id='phoneNumber'
              type='text'
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              value={data?.phoneNumber}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='address' className='inline-block w-24 mr-4'>
              주소
            </label>
            <input
              id='address'
              type='text'
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              value={data?.address}
            />
          </div>
          <div className='self-end'>
            <Button text='저장' />
          </div>
        </form>
      </div>
    </section>
  );
}
