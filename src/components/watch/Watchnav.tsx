import { OndemandVideo, Search, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React from 'react';
import Link from 'next/link';

const Watchnav = () => {
  return (
    <div className=' hidden md:flex w-1/4 min-w-[300px] overflow-auto flex-col gap-2 p-2 bg-white h-screen sticky top-0'>
      <div className='flex justify-between p-2 items-center'>
        <h1 className=' font-semibold text-2xl capitalize'>watch</h1>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
      <div className=' flex items-center gap-2 p-2 rounded-2xl bg-gray-100'>
        <Search className=' text-black/70' />
        <input
          className='flex-1 outline-none border-none bg-transparent text-sm text-white'
          placeholder='search...'
        />
      </div>
      <div className=' flex items-center gap-2 p-2 capitalize cursor-pointer hover:bg-gray-200 rounded-lg'>
        <IconButton>
          <OndemandVideo />{' '}
        </IconButton>
        <p>watch</p>{' '}
      </div>
      <Link
        href={'/saved'}
        className=' flex items-center gap-2 p-2 capitalize cursor-pointer hover:bg-gray-200 rounded-lg'
      >
        <IconButton>
          <BookmarkIcon />{' '}
        </IconButton>
        <p>saved videos</p>{' '}
      </Link>
      <div className=' flex items-center gap-2 p-2 capitalize cursor-pointer hover:bg-gray-200 rounded-lg'>
        <IconButton>
          <OndemandVideo />{' '}
        </IconButton>
        <p>live</p>{' '}
      </div>
      <div className=' flex items-center gap-2 p-2 capitalize cursor-pointer hover:bg-gray-200 rounded-lg'>
        <IconButton>
          <MovieIcon />{' '}
        </IconButton>
        <p>shows</p>{' '}
      </div>
    </div>
  );
};

export default Watchnav;
