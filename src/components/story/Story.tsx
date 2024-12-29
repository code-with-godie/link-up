import React, { Suspense } from 'react';
import StoryHeading from './StoryHeading';
import StoryListContainer from './StoryListContainer';
import StorySkeleton from '../skeleton/StorySkeleton';
const Story = () => {
  return (
    <div className=' flex flex-col my-shadow p-2 gap-2 overflow-auto bg-white'>
      <StoryHeading />
      <Suspense fallback={<StorySkeleton />}>
        <StoryListContainer />
      </Suspense>
    </div>
  );
};

export default Story;
