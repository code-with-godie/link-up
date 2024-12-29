'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import Friend from '@/components/friends/Friend';
import { useAppContext } from '@/context/AppContext';
import { Skeleton } from '@mui/material';
import { Models } from 'appwrite';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
type MiniUser = {
  username: string;
  profilePic: string;
  coverPic?: string;
  $id: string;
  likes?: string[];
  followers?: string[];
  friends?: string[];
  friendRequest?: string[];
};
const OnBaordingPage = () => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<MiniUser[]>([]);
  const dontShow = async () => {
    try {
      if (!user) return;
      await appwriteService.handleOnBoarding(user?.$id);
    } catch (error) {
      console.log(error);
    }
  };
  const getPeople = useCallback(async () => {
    try {
      if (!user) return;
      setLoading(true);
      const res: Models.Document[] = await appwriteService.getUsers(user?.$id);
      const friends: MiniUser[] = res.map((doc: Models.Document) => ({
        username: doc?.username,
        profilePic: doc?.profilePic,
        coverPic: doc?.coverPic,
        likes: doc.likes,
        followers: doc.followers,
        $id: doc.$id,
        friends: doc.friends,
        friendRequest: doc.friendRequest,
      }));
      setFriends(friends);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //    console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <section className=' flex flex-col gap-2 h-full'>
      <div className=' flex p-2 gap-2 flex-col  overflow-auto'>
        <h1 className=' font-semibold text-lg text-primary'>
          Add some friends and people you may know{' '}
        </h1>
        <p className=' text-sm text-gray-600'>
          follow some acount to personalize the posts you see{' '}
        </p>
      </div>
      <div className='my-grid overflow-auto flex-1'>
        {loading ? (
          <>
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
            <Skeleton
              key={Math.random()}
              width={200}
              height={300}
              variant='rounded'
            />
          </>
        ) : (
          friends.map(item => (
            <Friend
              key={item.$id}
              {...item}
            />
          ))
        )}
      </div>
      <div
        onClick={dontShow}
        className=' p-2 mb-4 flex  justify-end'
      >
        <Link
          href={'/'}
          className=' bg-primary text-white py-2 px-4 rounded-lg cursor-pointer'
        >
          skip
        </Link>
      </div>
    </section>
  );
};

export default OnBaordingPage;
