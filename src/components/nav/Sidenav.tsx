'use client';
import React from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import { Avatar, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import { RiCalendarEventFill } from 'react-icons/ri';
import { MdEventRepeat } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';

const Leftbar = () => {
  const router = useRouter();
  const appContext = useAppContext();
  const user = appContext?.user;

  return (
    <div className=' flex p-2 flex-col gap-1'>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(`/profile/${user?.$id}`)}
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg '>
          <IconButton>
            <Avatar
              src={user?.profilePic}
              className='profile'
            />
          </IconButton>
          <p className='md:text-lg font-medium'> {user?.username} </p>
        </div>
      </div>
      <Link
        className='link'
        href='/friends'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <PeopleIcon className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>friends</p>{' '}
        </div>
      </Link>
      <Link
        className='link'
        href='/watch'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <OndemandVideoIcon className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>watch</p>{' '}
        </div>
      </Link>
      <Link
        href='/'
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <MdEventRepeat className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>memories</p>{' '}
        </div>
      </Link>
      <Link
        href='/saved'
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <BookmarkIcon className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>saved</p>{' '}
        </div>
      </Link>
      <Link
        href='/'
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <AssistantPhotoIcon className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>pages</p>{' '}
        </div>
      </Link>
      <Link
        href='/'
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <RiCalendarEventFill className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>events</p>{' '}
        </div>
      </Link>
      <Link
        href='/'
        className='link'
      >
        <div className=' flex gap-2 items-center hover:bg-gray-200 rounded-lg  p-2'>
          <IconButton>
            <GradeIcon className='text-primary md:text-3xl' />
          </IconButton>{' '}
          <p className='md:text-lg font-medium'>favourites</p>{' '}
        </div>
      </Link>
    </div>
  );
};

export default Leftbar;
