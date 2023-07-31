'use client';

import Image from 'next/image';
import FileIcon from './icon/FileIcon';
import { FormEvent, ChangeEvent, useState, useRef, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './Loading';

const categoryOptions = ['women', 'men', 'acc-shoes'];

export default function NewProduct() {
  const nameRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState('women');
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', nameRef.current?.value ?? '');
    formData.append('description', descriptionRef.current?.value ?? '');
    formData.append('size', sizeRef.current?.value ?? '');
    formData.append('price', priceRef.current?.value ?? '');
    formData.append('category', category);

    fetch('/api/products/', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className='w-full max-w-5xl px-5 pb-10 mx-auto'>
      <h2 className='w-full pb-3 mb-3 text-2xl text-center '>제품 등록</h2>
      {loading && (
        <div className='fixed inset-0 z-20 justify-center pt-28 bg-neutral-500/10'>
          <Loading />
        </div>
      )}
      {error && (
        <p className='w-full p-4 mb-4 font-bold text-center text-red-600 bg-red-100'>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          className='hidden'
          type='file'
          accept='image/*'
          id='image'
          name='image'
          onChange={handleChange}
        />

        <label
          className={`w-full h-96 flex flex-col items-center justify-center relative mb-5 ${
            !file && 'border-2 border-neutral-500 border-dashed'
          }`}
          htmlFor='image'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className='absolute inset-0 z-10 pointer-events-none bg-sky-500/20' />
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'>
              <FileIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
              />
            </div>
          )}
        </label>

        <label htmlFor='name' className='mb-2'>
          이름
        </label>
        <input
          className='p-2 mb-4 border'
          type='text'
          id='name'
          name='name'
          ref={nameRef}
          required
        />

        <label htmlFor='category' className='mb-2'>
          카테고리
        </label>
        <select
          className='p-2 mb-4 border'
          name='size'
          id='category'
          onChange={onChange}
          required
        >
          {categoryOptions.map((category, index) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor='size' className='mb-2'>
          사이즈
        </label>
        <input
          className='p-2 mb-4 border'
          type='text'
          id='size'
          ref={sizeRef}
          required
          placeholder='❗ 사이즈를 순서대로 ,(쉼표)로 구분하여 입력해 주세요.'
        />

        <label htmlFor='price' className='mb-2'>
          가격
        </label>
        <input
          className='p-2 mb-4 border'
          type='number'
          id='price'
          ref={priceRef}
          min={0}
          required
        />

        <label htmlFor='description' className='mb-2'>
          제품 설명
        </label>
        <textarea
          className='p-2 mb-4 border resize-none'
          id='description'
          ref={descriptionRef}
          required
        />
        <button
          className='p-2 text-white bg-black'
          disabled={!file ? true : false}
        >
          제품 등록
        </button>
      </form>
    </section>
  );
}
