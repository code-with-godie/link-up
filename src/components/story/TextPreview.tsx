import React from 'react';
import TextSelector from './TextSelector';

const TextPreview = ({
  text,
  color,
  setText,
  setColor,
}: {
  text: string;
  color: string;
  setText: (text: string) => void;
  setColor: (color: string) => void;
}) => {
  return (
    <div className='w-full  m-2 md:flex-1 md:h-full flex flex-col justify-center items-center gap-2 p-4 bg-white rounded-lg'>
      <div className=' bg-white flex md:hidden'>
        <TextSelector
          setText={setText}
          text={text}
          setColor={setColor}
        />
      </div>
      <h1 className=' w-full font-semibold'>Preview</h1>
      <div className=' flex-1 bg-black rounded-lg w-full flex justify-center items-center p-2'>
        <div
          style={{ background: color }}
          className={`w-full h-[90vh] md:h-full max-w-[300px] max-h-[450px] rounded-lg grid place-content-center p-2 `}
        >
          <p className=' text-2xl font-bold text-white text-justify'>
            {' '}
            {text.length === 0 ? 'start typing' : text}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextPreview;
