'use client';

import { DetailUser } from '@/model/user';
import Avatar from './Avatar';
import Button from './ui/Button';
import useSWR from 'swr';
import { FormEvent, useEffect, useState } from 'react';

export default function Profile() {
  const { data, isLoading } = useSWR<DetailUser>('/api/me');
  const [userInfo, setUserInfo] = useState({ ...data });
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState('');
  const [file, setFile] = useState<File>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'file') {
      const files = e.target?.files;
      if (files && files[0]) {
        setFile(files[0]);
      }
      return;
    }

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('photo', file);
    }
    formData.append('address', userInfo.address ?? '');
    formData.append('name', userInfo.name ?? '');
    formData.append('phoneNumber', userInfo.phoneNumber ?? '');

    fetch('/api/me/', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        } else {
          setSuccess('변경이 완료되었습니다');
        }
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      })
      .catch((err) => setError(err.toString()));
  };

  useEffect(() => {
    setUserInfo({ ...data });
  }, [data]);

  return (
    <section
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center p-5 border rounded-md bg-neutral-100/50'
    >
      <h2 className='w-full pb-3 mb-5 text-lg font-semibold text-center border-b-2'>
        회원정보 수정
      </h2>
      {error && (
        <p className='w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100'>
          {error}
        </p>
      )}
      {success && (
        <p className='w-full p-4 mb-4 font-bold text-center text-green-600 bg-green-100'>
          {success}
        </p>
      )}
      <div className='flex'>
        <div className='flex flex-col pt-4 mr-10'>
          {!file && (
            <Avatar
              image={userInfo.photo ? userInfo.photo : data?.image}
              size='large'
            />
          )}
          {file && <Avatar image={URL.createObjectURL(file)} size='large' />}
          <label
            htmlFor='file'
            className='mt-5 text-center cursor-pointer hover:text-mainColor'
          >
            이미지 변경
          </label>
        </div>
        <form className='flex flex-col justify-between'>
          <div className='mb-4'>
            <label htmlFor='name' className='inline-block w-24 mr-4'>
              이름
            </label>
            <input
              id='name'
              type='text'
              name='name'
              value={userInfo.name ?? ''}
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              onChange={onChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='inline-block w-24 mr-4'>
              이메일
            </label>
            <input
              id='email'
              type='email'
              name='email'
              value={userInfo.email ?? ''}
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60 opacity-70'
              readOnly
              onChange={onChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='phoneNumber' className='inline-block w-24 mr-4'>
              전화번호
            </label>
            <input
              id='phoneNumber'
              type='tel'
              name='phoneNumber'
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              value={userInfo.phoneNumber ?? ''}
              onChange={onChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='address' className='inline-block w-24 mr-4'>
              주소
            </label>
            <input
              id='address'
              type='text'
              name='address'
              className='p-2 mb-3 border rounded-md outline-none border-neutral-200 w-60'
              value={userInfo.address ?? ''}
              onChange={onChange}
            />
          </div>
          <input
            className='hidden'
            name='file'
            id='file'
            type='file'
            accept='image/*'
            onChange={onChange}
          />
          <div className='self-end'>
            <Button text='저장' />
          </div>
        </form>
      </div>
    </section>
  );
}