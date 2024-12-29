'use client';
import { IComment } from '@/typings/typing';
import React, { useState } from 'react';
import PostAvatar from './PostAvatar';
const Comment = ({
  user: { username, profilePic, $id: userID },
  title,
}: IComment) => {
  const [showMore, setShowMore] = useState<boolean>(
    title?.length > 100 ? true : false
  );
  return (
    <div className=' flex items-center gap-2'>
      <PostAvatar
        userID={userID}
        profilePic={profilePic}
        username={username}
      />
      <div className=' py-2 px-4 rounded-lg bg-gray-100'>
        <h1 className=' font-medium text-lg'> {username} </h1>
        <div className=' flex flex-col'>
          <p className=' text-sm'>
            {showMore ? `${title.substring(0, 100)}...` : title}
          </p>
          {title.length > 100 && (
            <p
              className=' text-sm text-gray-600 cursor-pointer'
              onClick={() => setShowMore(prev => !prev)}
            >
              {' '}
              {showMore ? 'show More' : 'show less'}{' '}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
