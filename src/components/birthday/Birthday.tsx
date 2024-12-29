import Image from 'next/image';
import React from 'react';

const Birthday = () => {
  return (
    <div className=' flex flex-col gap-2'>
      <h1 className=' text-gray-700 font-semibold text-lg'>Birthdays</h1>
      <div className=' flex flex-1 items-start gap-4'>
        <Image
          src={'/gift.png'}
          alt='birthday'
          width={40}
          height={40}
          className=' object-contain'
        />
        <p className=' text-sm'>
          {' '}
          <strong className=' text-base'>Valentine wambui </strong>
          and
          <strong className=' text-base'> 3 others </strong>
          have their birthday today
        </p>
      </div>
    </div>
  );
};

export default Birthday;
