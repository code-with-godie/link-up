import React from 'react';
import Link from 'next/link';
import { Search } from '@mui/icons-material';
import Image from 'next/image';
const LogoContainer = () => {
  return (
    <div className='flex items-center gap-4'>
      <Link href='/'>
        <Image
          alt='log'
          src='/logo.png'
          width={70}
          height={70}
        />
      </Link>
      <div className='hidden flex-1 lg:flex gap-4 items-center px-2  bg-soft rounded-2xl'>
        <Search className=' text-gray-600' />
        <input
          className=' bg-transparent p-1 flex-1 border-none outline-none'
          placeholder='search...'
        />
      </div>
    </div>
  );
};

export default LogoContainer;
