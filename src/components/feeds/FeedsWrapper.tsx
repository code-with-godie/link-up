'use client';
import { useAppContext } from '@/context/AppContext';
import React, { Suspense } from 'react';
import PostsSkeleton from '../skeleton/PostSkeleton';
import Feeds from './Feeds';

const FeedsWrapper = () => {
  const appContext = useAppContext();

  return (
    <Suspense fallback={<PostsSkeleton />}>
      <Feeds userID={appContext?.user?.$id} />
    </Suspense>
  );
};

export default FeedsWrapper;
