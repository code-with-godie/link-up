'use client';
import React, { useEffect, useRef } from 'react';

const VideoPost = ({
  url,
  observer,
}: {
  url: string;
  observer: IntersectionObserver | null | undefined;
}) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      observer?.observe(video);
    }

    // video?.addEventListener('click', togglePlay);
    // video?.addEventListener('play', handlePlayAndPause);
    // video?.addEventListener('pause', handlePlayAndPause);
    // video?.addEventListener('timeupdate', handleTimeUpdate);
    // video && setTime(video?.duration);
    return () => {
      // video?.removeEventListener('click', togglePlay);
      // video?.removeEventListener('play', handlePlayAndPause);
      // video?.removeEventListener('pause', handlePlayAndPause);
      // video?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, observer]);
  return (
    <div className='w-full relative h-[500px]  bg-black/95'>
      <video
        ref={videoRef}
        controls
        className=' w-full h-full object-contain'
        src={url}
        loop
      ></video>
    </div>
  );
};

export default VideoPost;
