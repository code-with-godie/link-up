import Watchnav from '@/components/watch/Watchnav';
import WatchVideos from '@/components/watch/WatchVideos';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'watch',
  description:
    'watch interesting video on link up and get yourself entertained',
};
const Watch = () => {
  return (
    <div className=' flex'>
      <Watchnav />
      <WatchVideos />
    </div>
  );
};

export default Watch;
