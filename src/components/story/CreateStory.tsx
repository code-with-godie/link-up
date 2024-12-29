'use client';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
const CreatStory = () => {
  const router = useRouter();
  const appContext = useAppContext();
  const user = appContext?.user;
  return (
    <div className=' cursor-pointer w-[200px]  h-full rounded-lg bg-white ring ring-gray-100 flex flex-col gap-2'>
      <div className=' flex-1 w-full relative'>
        <Image
          fill
          alt='CREATE STORY'
          className=' object-cover rounded-tr-lg rounded-tl-lg'
          src={user?.profilePic || '/cover.png'}
        />
      </div>
      <div
        onClick={() => router.push('/story')}
        className='relative flex flex-col gap-2 items-center justify-center bg-gray-100  px-4  min-h-14 py-2'
      >
        <AddCircleIcon
          fontSize='large'
          className=' text-primary absolute z-50 -top-[30%] text-3xl'
        />
        <p className=' text-nowrap'>create story</p>
      </div>
    </div>
  );
};

export default CreatStory;
