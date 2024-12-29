import { Skeleton } from '@mui/material';
import React from 'react';

const UserDetailsSkeleton = () => {
  return (
    <div className=' min-h-[80vh] bg-gradient-to-b from-gray-300 to-white flex  flex-col'>
      <div className=' w-full max-w-[1000px] flex flex-col p-2'>
        <Skeleton
          className='flex-1 w-full h-full'
          variant='rounded'
        />
      </div>
    </div>
  );
};

export default UserDetailsSkeleton;
