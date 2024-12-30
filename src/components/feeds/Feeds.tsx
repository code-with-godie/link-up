import React from 'react';
import PostList from '../postList/PostList';
import { appwriteService } from '@/appWrite/appwriteService';
import Image from 'next/image';
import { Post } from '@/typings/typing';
const Feeds = async ({
  userID,
  type,
  saved,
}: {
  userID?: string;
  type?: string;
  saved?: string[] | undefined;
}) => {
  let feeds: Post[] = [];
  if (type === 'videos') {
    feeds = await appwriteService.getVideos();
  } else if (type === 'saved') {
    feeds = await appwriteService.getSaved(saved);
  } else if (type === 'usersPosts' && userID) {
    feeds = await appwriteService.getUserPost(userID);
  } else {
    feeds = await appwriteService.getFeeds();
  }

  if (!feeds) {
    return <p>coul not load feeds</p>;
  }

  if (feeds.length === 0) {
    return (
      <div className=' bg-white h-[85vh] flex items-center justify-center gap-4 flex-col'>
        <Image
          alt='no post'
          src={'/nopost.png'}
          width={100}
          height={100}
        />
        <p className=' text-lg font-semibold'>
          {' '}
          {type === 'saved'
            ? 'You have not saved any posts'
            : 'There is no posts yet'}{' '}
        </p>

        <p className=' font-thin text-gray-500'>
          {' '}
          {type === 'saved'
            ? 'when you save a post,it will appear here'
            : 'When you add a post it will appear here'}{' '}
        </p>
      </div>
    );
  }
  return (
    <div className=' w-full'>
      <PostList posts={feeds} />
    </div>
  );
};

export default Feeds;
