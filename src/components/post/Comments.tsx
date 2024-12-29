'use client';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Avatar, CircularProgress, IconButton, Skeleton } from '@mui/material';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import { IComment } from '@/typings/typing';
import CommentsList from './CommentList';
import { useAppContext } from '@/context/AppContext';
import { appwriteService } from '@/appWrite/appwriteService';
import { useSocketContext } from '@/context/SocketContext';
import CustomEmojiPicker from '../emojiPicker/CustomEmojiPicker';
import { commentFormatter } from '@/lib';
const Comments = ({ postID, userID }: { userID: string; postID: string }) => {
  //decrations
  const [comments, setComments] = useState<IComment[]>([]);
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const user = appContext?.user;
  const socket = socketContext?.socket;
  const [slice, setSlice] = useState<number>(2);
  const [comment, setComment] = useState<string>('');
  const [send, setSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  //controlers
  const getPostComment = useCallback(async () => {
    const comments = await appwriteService.getPostComments(postID);
    setComments(comments);
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [postID]);

  const postComment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (comment === '') return;
      setSend(true);
      const tempComment: {
        title: string;
        postID: string;
        user?: string;
        type: 'text' | 'video' | 'image';
      } = {
        title: comment,
        postID,
        user: user?.$id,
        type: 'text',
      };
      const res = await appwriteService.sendComment(tempComment);
      if (res) {
        const newComment: IComment = commentFormatter(res);
        setComments(prev => [newComment, ...prev]);
        setComment('');
        socket?.emit('ADD_NOTIFICATION', {
          type: { target: 'post', type: 'COMMENT', ALLOW_DUPLICATE: true },
          postID,
          senderID: user?.$id,
          receiverID: userID,
          username: `${user?.username}`,
          messege: `commented on your post`,
        });
        socket?.emit('SEND_COMMENT_TO_OTHER_USER', {
          ...newComment,
          receiverID: userID,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSend(false);
    }
  };
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setComment(prev => prev + emojiObject.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket?.on('RECEIVE_COMMENT', comment => {
      console.log('RECEIVED', comment, comment?.senderID === user?.$id);
      if (comment?.postID === postID && comment?.user?.$id !== user?.$id) {
        setComments(prev => [comment, ...prev]);
      }
    });
  }, [socket, postID, user?.$id]);
  useEffect(() => {
    getPostComment();
  }, [getPostComment]);
  return (
    <div>
      {comments.length > 2 && (
        <p
          className=' text-gray-600 font-medium text-sm cursor-pointer hover:underline'
          onClick={() => setSlice(prev => (prev > 2 ? 2 : comments.length))}
        >
          {slice > 2 ? 'show less' : ' view more comments'}
        </p>
      )}

      {loading ? (
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 p-2 items-start'>
            <Avatar className='w-5 h-5' />
            <Skeleton
              height={60}
              width={200}
              variant='rounded'
            />
          </div>
          <div className='flex gap-2 p-2 items-start'>
            <Avatar className='w-5 h-5' />
            <Skeleton
              height={60}
              width={200}
              variant='rounded'
            />
          </div>
        </div>
      ) : (
        <CommentsList comments={comments?.slice(0, slice)} />
      )}
      <form
        onSubmit={postComment}
        className=' px-2 flex items-center rounded-2xl bg-gray-200 relative'
      >
        <input
          placeholder='Add a comment...'
          className=' border-none bg-transparent outline-none flex-1 text-sm'
          onFocus={() => setShowPicker(false)}
          value={comment}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setComment(e.target.value)
          }
        />
        {comment !== '' && (
          <button className=' text-primary'>
            {' '}
            {send ? <CircularProgress size={30} /> : 'post'}{' '}
          </button>
        )}
        <IconButton
          className='btn'
          onClick={() => setShowPicker(prev => !prev)}
        >
          <EmojiEmotionsOutlined className=' text-primary text-2xl' />
        </IconButton>
        {showPicker && <CustomEmojiPicker onEmojiClick={onEmojiClick} />}
      </form>
    </div>
  );
};

export default Comments;
