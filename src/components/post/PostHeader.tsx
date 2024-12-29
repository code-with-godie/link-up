'use client';
import { MoreHoriz } from '@mui/icons-material';
import React, { useState } from 'react';
import { format } from 'timeago.js';
import PostAvatar from './PostAvatar';
import { IconButton } from '@mui/material';
import PostDetails from './PostDetails';

type Props = {
  date: string;
  username: string;
  profilePic: string;
  userID: string;
  postID: string;
  caption?: string;
};
const PostHeader = ({
  date,
  caption,
  username,
  profilePic,
  postID,
  userID,
}: Props) => {
  const [index, setIndex] = useState<number>(80);
  const [more, setMore] = useState<boolean>(false);
  return (
    <div className=' relative'>
      <div className=' bg-white w-full p-2 flex  justify-between items-start'>
        <div className=' flex items-center gap-2'>
          <PostAvatar
            profilePic={profilePic}
            userID={userID}
            username={username}
          />
          <div className=' flex  flex-col '>
            <p> {username} </p>
            <p className=' text-sm text-gray-600'> {format(date)} </p>
            {caption && (
              <div className=' flex gap-1 flex-col'>
                <p>
                  {' '}
                  {caption?.length > index
                    ? `${caption?.substring(0, index)}...`
                    : caption}
                </p>
                {caption.length > 80 && (
                  <div>
                    {caption?.length > index ? (
                      <p
                        className=' text-sm text-black/90 cursor-pointer whitespace-nowrap'
                        onClick={() => setIndex(caption?.length)}
                      >
                        show more{' '}
                      </p>
                    ) : (
                      <p
                        className=' text-sm text-black/90 cursor-pointer whitespace-nowrap'
                        onClick={() => setIndex(80)}
                      >
                        show less{' '}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <IconButton onClick={() => setMore(prev => !prev)}>
          <MoreHoriz />
        </IconButton>
      </div>
      {more && (
        <PostDetails
          postID={postID}
          setMore={setMore}
          userID={userID}
          username={username}
        />
      )}
    </div>
  );
};

export default PostHeader;
