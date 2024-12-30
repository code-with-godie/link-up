'use client';
import Feeds from '@/components/feeds/Feeds';
import { useAppContext } from '@/context/AppContext';
import React from 'react';

const SavedPosts = () => {
  const appContext = useAppContext();
  const user = appContext?.user;
  return (
    <div className='flex-1 bg-white border-l-2 border-gray-100 p-2'>
      <Feeds
        saved={user?.saved}
        type='saved'
      />
    </div>
  );
};

export default SavedPosts;
