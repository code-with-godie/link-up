'use client';
import React, { useEffect } from 'react';

const Error = ({
  message,
  reset,
}: {
  reset: (value: string | null) => void;
  message: string;
}) => {
  useEffect(() => {
    const id = setTimeout(() => {
      reset(null);
    }, 3000);
    return () => clearTimeout(id);
  }, [reset]);
  return (
    <div className=' absolute top-16 w-screen z-50   text-white p-2 flex justify-center gap-4 items-center'>
      <div className=' w-full max-w-[300px] p-2 bg-red-400 text-white'>
        {message}
      </div>
    </div>
  );
};

export default Error;
