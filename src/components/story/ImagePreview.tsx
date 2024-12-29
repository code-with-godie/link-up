import Image from 'next/image';
import React from 'react';

const ImagePreview = ({
  type,
  file,
}: {
  file: File | null;
  type: 'image' | 'video' | null;
}) => {
  if (!file || !type) return;
  return (
    <div className='  m-2 flex-1 h-full flex flex-col justify-center items-center gap-2 p-4 bg-white rounded-lg '>
      <h1 className=' w-full font-semibold'>Preview</h1>
      <div className=' flex-1 bg-black rounded-lg w-full  flex justify-center items-center p-2'>
        <div className=' w-full h-full max-w-[300px] max-h-[450px] rounded-lg grid place-content-center relative'>
          {type === 'image' ? (
            <Image
              src={URL.createObjectURL(file)}
              alt='selected image'
              width={300}
              height={450}
              className=' object-cover rounded-lg'
            />
          ) : (
            <video
              className=' w-full h-full object-cover rounded-lg'
              controls
              muted
              autoPlay
              loop
              src={URL.createObjectURL(file)}
            ></video>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
