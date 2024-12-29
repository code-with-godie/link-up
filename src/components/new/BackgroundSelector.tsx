import { defaultColors } from '@/data';
import { generateColors } from '@/lib';
import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

const BackgroundSelector = ({
  setColor,
  setShowBg,
}: {
  setColor: (color: string) => void;
  setShowBg?: (value: boolean) => void;
}) => {
  const [colors, setColors] = useState(defaultColors);
  const hanleClick = (item: string) => {
    setColor(item);
    if (setShowBg) {
      setShowBg(false);
    }
  };

  return (
    <div className=' absolute z-50  bottom-full mb-2 w-screen max-w-[300px] h-screen max-h-[200px] bg-gray-100 rounded-lg p-2 flex gap-2 flex-wrap content-start overflow-auto'>
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

export default BackgroundSelector;
