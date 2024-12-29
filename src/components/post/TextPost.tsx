'use client';
import React, { useState } from 'react';

const TextPost = ({ text, bg }: { bg: string; text: string }) => {
  const [index, setIndex] = useState(500);
  return (
    <div
      style={{ background: bg }}
      className=' min-h-[50px]'
    >
      <p className=' p-2 font-mono text-center text-xl'>
        {text?.length > index ? `${text?.substring(0, index)}...` : text}
      </p>
      {text?.length > 500 && (
        <div>
          {text.length > index ? (
            <p
              onClick={() => setIndex(text.length)}
              className=' text-sm cursor-pointer p-2'
            >
              show more{' '}
            </p>
          ) : (
            <p
              onClick={() => setIndex(500)}
              className=' p-2 text-sm cursor-pointer'
            >
              show less{' '}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TextPost;
