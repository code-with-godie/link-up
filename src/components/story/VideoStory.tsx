'use client';
import { Story } from '@/typings/typing';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const VideoStory = ({ url, user }: Story) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handlePlayAndPause = () => {
    setPaused(videoRef.current?.paused ?? true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('play', handlePlayAndPause);
    video.addEventListener('pause', handlePlayAndPause);

    return () => {
      video.removeEventListener('play', handlePlayAndPause);
      video.removeEventListener('pause', handlePlayAndPause);
    };
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className='shrink-0 relative cursor-pointer flex justify-center'
    >
      <button className='absolute top-2 right-2 z-50 flex justify-center items-center'>
        <button
          onClick={() => setMuted(false)}
          className='absolute bottom-2 z-50 flex justify-center items-center right-2'
        >
          <FaVolumeMute
            className={`text-white ${muted ? 'visible' : 'invisible'}`}
          />
        </button>
        <button
          onClick={() => setMuted(true)}
          className='absolute bottom-2 z-50 flex justify-center items-center right-2'
        >
          <FaVolumeUp
            className={`text-white absolute top-2 right-2 ${
              muted ? 'invisible' : 'visible'
            }`}
          />
        </button>
      </button>
      <video
        onMouseEnter={togglePlay}
        onMouseLeave={togglePlay}
        loop
        muted={muted}
        ref={videoRef}
        src={url}
        width={120}
        height={150}
        className='rounded-lg object-cover'
      />
      <Image
        src={user?.profilePic || '/cover.png'}
        width={40}
        height={40}
        alt='story picture'
        className='absolute z-10 top-1 left-1 rounded-full border-gray-50 border'
      />
      <button className='absolute bottom-2 z-50 flex justify-center items-center'>
        <FaPlay
          className={`text-white absolute bottom-2 ${
            paused ? 'visible' : 'invisible'
          }`}
        />
        <FaPause
          className={`text-white absolute bottom-2 ${
            paused ? 'invisible' : 'visible'
          }`}
        />
      </button>
    </div>
  );
};

export default VideoStory;
