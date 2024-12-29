import Feeds from '@/components/feeds/Feeds';
import Followings from '@/components/following/Followings';
import Share from '@/components/share/Share';
import PostsSkeleton from '@/components/skeleton/PostSkeleton';
import Story from '@/components/story/Story';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className=' flex p-2  justify-center'>
      <div className=' w-full max-w-[500px] flex flex-col gap-2'>
        <Followings />
        <Story />
        <Share home />
        <Suspense fallback={<PostsSkeleton />}>
          <Feeds />
        </Suspense>
      </div>
    </div>
  );
}
