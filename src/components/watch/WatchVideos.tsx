import React from 'react';
import Feeds from '../feeds/Feeds';

const WatchVideos = () => {
  return (
    <div className='flex-1 bg-white border-l-2 border-gray-100 p-2'>
      <Feeds type='videos' />
    </div>
  );
};

export default WatchVideos;
