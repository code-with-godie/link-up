import React from 'react';

const Model = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=' top-0 left-0 fixed z-[10000000000000000000000] bg-black/30 h-screen w-screen  flex justify-center items-center p-2'>
      {children}
    </div>
  );
};

export default Model;
