'use client';
import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { Post as IPost } from '@/typings/typing';

const PostList = ({ posts }: { posts: IPost[] }) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [muted, setMuted] = useState(false);

  const createObserver = () => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (
              entry.target instanceof HTMLVideoElement ||
              entry.target instanceof HTMLAudioElement
            ) {
              if (entry.target.paused) {
                entry.target.play();
              }
            }
          } else {
            if (
              entry.target instanceof HTMLVideoElement ||
              entry.target instanceof HTMLAudioElement
            ) {
              if (!entry.target.paused) {
                entry.target.pause();
              }
            }
          }
        });
      },
      { threshold: 0.75 }
    );
    return observer;
  };

  useEffect(() => {
    const observer = createObserver();
    setObserver(observer);
  }, []);

  return (
    <div className='w-full flex flex-col gap-2'>
      {posts.map(item => (
        <Post
          observer={observer}
          key={item.$id}
          {...item}
        />
      ))}
    </div>
  );
};

export default PostList;
