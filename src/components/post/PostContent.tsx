import Image from 'next/image';
import React from 'react';
import VideoPost from './VideoPost';
import TextPost from './TextPost';

const PostContent = ({
  type,
  url,
  bg,
  text,
  observer,
}: {
  url: string;
  bg: string;
  text: string;
  observer: IntersectionObserver | null | undefined;
  type: 'image' | 'video' | 'text';
}) => {
  if (type === 'text') {
    return (
      <TextPost
        bg={bg}
        text={text}
      />
    );
  }
  if (type === 'video') {
    return (
      <VideoPost
        observer={observer}
        url={url}
      />
    );
  }
  return (
    <div className='w-full relative h-[500px]  bg-black/95'>
      <Image
        fill
        alt='post image'
        src={url}
        className=' object-contain w-full h-auto'
      />
    </div>
  );
};

export default PostContent;
