import { MiniUser } from '@/typings/typing';
import React from 'react';
import PostAvatar from '../post/PostAvatar';
const SuggestedAccount = ({
  username,
  followers,
  profilePic,
  $id,
}: MiniUser) => {
  return (
    <div className=' flex gap-2 items-center p-2 rounded-lg hover:bg-gray-300'>
      <PostAvatar
        userID={$id}
        username={username}
        profilePic={profilePic}
      />
      <div className=' flex flex-col gap-1'>
        <strong className=' text-black/85'> {username} </strong>
        <p className=' text-sm text-gray-600'>
          {followers?.length === 1
            ? `${followers.length} follower`
            : `${followers?.length} followers`}
        </p>
      </div>
    </div>
  );
};

export default SuggestedAccount;
