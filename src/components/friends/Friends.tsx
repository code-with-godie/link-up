'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { miniUsersFormatter } from '@/lib';
import { MiniUser } from '@/typings/typing';
import { Skeleton } from '@mui/material';
import { Models } from 'appwrite';
import React, { useCallback, useEffect, useState } from 'react';
import Friend from './Friend';

const Friends = ({ showTitle }: { showTitle?: boolean }) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<MiniUser[]>([]);
  const getPeople = useCallback(async () => {
    try {
      if (!user) return;
      setLoading(true);
      const res: Models.Document[] = await appwriteService.getUsers(user?.$id);
      const friends = miniUsersFormatter(res);
      setFriends(friends);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <section
      className={`flex  p-2 rounded-lg flex-col gap-2 ${
        showTitle && 'bg-white'
      }`}
    >
      {showTitle && (
        <h1 className='  text-primary text-lg font-semibold'>Friends</h1>
      )}
      <div className='my-grid items-stretch overflow-auto w-full h-full bg-gray-100  rounded-lg'>
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
    </section>
  );
};

export default Friends;
