'use client';
import { useAppContext } from '@/context/AppContext';
import { useBlockUser, useDeletePost, useSavePost } from '@/hooks';
import {
  AddCircle,
  Block,
  Bookmark,
  BookmarkOutlined,
  DeleteForever,
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';

const PostDetails = ({
  username,
  userID,
  postID,
  setMore,
}: {
  username: string;
  userID: string;
  postID: string;
  setMore: (value: boolean) => void;
}) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const mine = user?.$id === userID;
  const closeModel = () => {
    setMore(false);
  };
  const { loading: deleting, handleDelete } = useDeletePost(postID, closeModel);
  const [blocked, setBlocked] = useState(user?.blockedUsers?.includes(userID));
  const [saved, setSaved] = useState(user?.saved?.includes(postID));
  const { loading: saving, handleSave } = useSavePost(
    postID,
    closeModel,
    user?.$id
  );
  const { loading: blocking, handleBlock } = useBlockUser(
    closeModel,
    userID,
    user?.$id
  );
  useEffect(() => {
    setBlocked(user?.blockedUsers?.includes(userID));
    setSaved(user?.saved?.includes(postID));
  }, [postID, userID, user]);
  return (
    <div className=' absolute  top-8 my-shadow right-0 bg-white rounded-lg z-50 min-h-[150px] w-full max-w-[300px] flex flex-col gap-2 p-2 my-4'>
      <div className=' flex items-center gap-4 p-2'>
        <AddCircle className=' text-primary text-2xl' />
        <div className=' flex flex-col'>
          <h1 className=' font-bold text-black/70'>Show more</h1>
          <p className=' text-gray-500 text-sm'>
            {' '}
            more of your post will be like this{' '}
          </p>
        </div>
      </div>
      <div className=' flex items-center gap-4 p-2'>
        <FaMinusCircle className=' text-primary text-2xl' />
        <div className=' flex flex-col'>
          <h1 className=' font-bold text-black/70'>Show less</h1>
          <p className=' text-gray-500 text-sm'>
            {' '}
            less of you posts will be like this{' '}
          </p>
        </div>
      </div>
      <button
        disabled={saving}
        className=' flex items-center gap-4 p-2 cursor-pointer disabled:cursor-not-allowed'
      >
        {saved ? (
          <Bookmark className=' text-gray-500 text-2xl' />
        ) : (
          <BookmarkOutlined className=' text-gray-500 text-2xl' />
        )}
        <div
          onClick={handleSave}
          className=' flex flex-col cursor-pointer flex-1 '
        >
          {saving ? (
            <div className=' text-primary flex items-center gap-4'>
              <CircularProgress
                color='inherit'
                size={30}
              />
              <p> {saved ? 'Unsaving post' : 'Saving post'} </p>
            </div>
          ) : (
            <>
              <h1 className=' font-bold text-black/70 text-start'>
                {' '}
                {saved ? 'Unsave post' : 'Save post'}{' '}
              </h1>
              <p className=' text-gray-500 text-sm text-start'>
                {' '}
                add this post to your saved posts
              </p>
            </>
          )}
        </div>
      </button>
      <button
        disabled={blocking}
        className=' flex items-center gap-4 p-2 cursor-pointer disabled:cursor-not-allowed'
      >
        <Block className=' text-gray-500 text-2xl' />
        <div
          onClick={handleBlock}
          className=' flex flex-col flex-1'
        >
          {blocking ? (
            <div className=' text-primary flex items-center gap-4'>
              <CircularProgress
                color='inherit'
                size={30}
              />
              <p> {blocked ? 'Unblocking user' : 'Blocking user'} </p>
            </div>
          ) : (
            <>
              <h1 className=' font-bold text-black/70 text-start'>
                {' '}
                {blocked ? `Unblock ${username} ` : `Block ${username} `}{' '}
              </h1>
              <p className=' text-gray-500 text-sm text-start'>
                {' '}
                stop seeing post but stay friends
              </p>
            </>
          )}
        </div>
      </button>
      {mine && (
        <button
          disabled={deleting}
          onClick={handleDelete}
          className=' flex items-center gap-4 p-2 cursor-pointer disabled:cursor-not-allowed'
        >
          <DeleteForever className='text-2xl text-red-500' />
          <div className=' flex-1 flex flex-col'>
            {deleting ? (
              <div className=' text-primary flex items-center gap-4'>
                <CircularProgress
                  color='inherit'
                  size={30}
                />
                <p>Deleting post</p>
              </div>
            ) : (
              <>
                {' '}
                <h1 className=' font-bold text-black/70 text-start'>
                  Delete this post{' '}
                </h1>
                <p className=' text-gray-500 text-sm text-start'>
                  {' '}
                  delete permanently this post
                </p>
              </>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default PostDetails;
