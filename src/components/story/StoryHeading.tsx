'use client';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MovieIcon from '@mui/icons-material/Movie';
import { useState } from 'react';
const StoryHeading = () => {
  const [index, setIndex] = useState<number>(0);

  const handleClick = (value: number) => {
    setIndex(value);
  };
  return (
    <div className=' flex items-center'>
      <div
        onClick={() => handleClick(0)}
        className={`flex cursor-pointer justify-center items-center flex-1 rounded-l-md py-2 ${
          index === 0 ? 'bg-primary text-white' : 'bg-gray-100'
        }`}
      >
        <ImportContactsIcon className='icon' />
        <p>stories</p>
      </div>
      <div
        onClick={() => handleClick(1)}
        className={`flex cursor-pointer  py-2 justify-center items-center flex-1 rounded-l-md ${
          index === 1 ? 'bg-primary text-white' : 'bg-gray-100'
        }`}
      >
        <MovieIcon className='icon' />
        <p>reels</p>
      </div>
    </div>
  );
};

export default StoryHeading;
