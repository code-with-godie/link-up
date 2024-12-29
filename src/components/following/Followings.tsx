'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { IFollowings } from '@/typings/typing';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import PostAvatar from '../post/PostAvatar';

const Followings = () => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const [followings, setFollowings] = useState<IFollowings[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getFollowingAccount = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) return [];
      const res = await appwriteService.getFollowingAccount(user.followings);
      setFollowings(res);
    } catch (error) {
      console.log(error);

      setError('could not load following account');
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    getFollowingAccount();
  }, [getFollowingAccount]);
  if (error) {
    return <p> {error} </p>;
  }
  return (
    <div className=' flex gap-4 overflow-auto w-full  items-center bg-white py-5  px-2'>
      {loading ? (
        <div className=' flex gap-2 overflow-auto w-full items-center bg-white py-5  px-2'>
          {Array(10).fill(
            <div
              className=' flex flex-col gap-1 items-center'
              key={Math.random().toString()}
            >
              <Skeleton
                variant='circular'
                width={50}
                height={50}
              />
              <Skeleton
                variant='rounded'
                className=' flex-1'
                height={50}
              />
            </div>
          )}
        </div>
      ) : (
        followings?.map((item, index) => (
          <div key={index}>
            <div className=' flex flex-col gap-1 items-center'>
              <PostAvatar
                username={item.username}
                profilePic={item.profilePic}
                userID={item.$id}
              />
              <p className=' text-sm'>
                {item.username.length > 6
                  ? `${item.username.substring(0, 5)}...`
                  : item.username}
              </p>
            </div>
          </div>
        ))
      )}

      {followings?.length < 30 && (
        <Link
          href='/friends'
          className=' p-4 bg-gray-200 rounded-full cursor-pointer'
        >
          <FaPlus className=' text-black/80' />
        </Link>
      )}
    </div>
  );
};

export default Followings;
