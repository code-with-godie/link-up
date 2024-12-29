import { defaultColors } from '@/data';
import { generateColors } from '@/lib';
import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

const TextBgSelector = ({
  setColor,
}: {
  setColor: (color: string) => void;
}) => {
  const [colors, setColors] = useState(defaultColors);
  const hanleClick = (item: string) => {
    setColor(item);
  };

  return (
    <div className='  w-full h-60 bg-gray-100 rounded-lg p-2 flex gap-2 flex-wrap content-start overflow-auto'>
      {colors?.map((item, index) => (
        <div
          onClick={() => hanleClick(item)}
          style={{ background: item }}
          key={index}
          className=' size-9 rounded-lg cursor-pointer'
        ></div>
      ))}
      {colors.length < 39 && (
        <div
          className=' size-9 rounded-lg cursor-pointer bg-gray-200 grid place-content-center'
          onClick={() => setColors(prev => [...prev, ...generateColors()])}
        >
          {' '}
          <BsPlus className=' text-4xl' />{' '}
        </div>
      )}
    </div>
  );
};

export default TextBgSelector;
