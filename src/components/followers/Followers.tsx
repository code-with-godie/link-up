import { appwriteService } from '@/appWrite/appwriteService';
import { IFollowings, User } from '@/typings/typing';
import { Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import PostAvatar from '../post/PostAvatar';
const Followers = ({ user }: { user?: User }) => {
  const [followings, setFollowings] = useState<IFollowings[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getFollowingAccount = useCallback(async () => {
    try {
      setLoading(true);
      if (!user) return [];
      const res = await appwriteService.getFollowers(user.followers);
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
    <div className='flex  overflow-auto relative gap-2 py-4'>
      {loading ? (
        <div className=' flex gap-2 overflow-auto  items-center  py-5  px-2'>
          {Array(4).fill(
            <div
              className=' flex flex-col gap-1 items-center'
              key={Math.random().toString()}
            >
              <Skeleton
                variant='circular'
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      ) : (
        followings.map(item => (
          <PostAvatar
            key={item.$id}
            userID={item.$id}
            username={item.username}
            profilePic={item.profilePic}
          />
        ))
      )}
    </div>
  );
};

export default Followers;
