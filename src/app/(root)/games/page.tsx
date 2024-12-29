import Image from 'next/image';
import React from 'react';

const GamePage = () => {
  return (
    <div className=' w-full h-screen flex justify-center items-center flex-col gap-4 bg-white'>
      <Image
        src={'/store.png'}
        alt='comming soon'
        width={300}
        height={200}
        className=' object-contain'
      />
      <h1 className=' font-bold text-lg text-primary'>cooming soon</h1>
    </div>
  );
};

export default GamePage;
