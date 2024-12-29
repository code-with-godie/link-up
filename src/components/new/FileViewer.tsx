import Image from 'next/image';
import React from 'react';

const FileViewer = ({
  file,
  setType,
}: {
  setType: (value: string) => void;
  file: File;
}) => {
  const fileType = file?.type?.split('/')[0];
  setType(fileType);
  const url = URL.createObjectURL(file);
  if (fileType === 'video') {
    return (
      <div className='h-72 w-full bg-black/90 relative'>
        <video
          controls
          autoPlay
          muted
          loop
          src={url}
          width='100%'
          className=' object-contain w-56 h-56'
        />
      </div>
    );
  }
  return (
    <div className='h-72 w-full bg-black/90 relative'>
      <Image
        alt='image preview'
        src={url}
        fill
        className=' object-contain'
      />
    </div>
  );
};

export default FileViewer;
