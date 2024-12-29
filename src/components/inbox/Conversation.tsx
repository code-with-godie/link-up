'use client';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Message from './Message';
import { IMessage, Conversation as IConversation } from '@/typings/typing';
import { appwriteService } from '@/appWrite/appwriteService';
import { Skeleton } from '@mui/material';
import { messegesFormatter } from '@/lib';
import toast from 'react-hot-toast';

const Conversation = ({
  chats,
  conversation,
  setChats,
  messegeRef,
}: {
  messegeRef: MutableRefObject<HTMLDivElement | null>;
  chats: IMessage[];
  conversation: IConversation;
  setChats: (value: IMessage[]) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const getChats = useCallback(async () => {
    const res = await appwriteService.getRoomMesseges(conversation.roomID);
    const messages = messegesFormatter(res);
    setChats(messages);

    try {
      setLoading(true);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to Load chats');
      setError('could not load the chats');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [conversation, setChats]);

  useEffect(() => {
    getChats();
  }, [getChats]);
  if (loading) {
    return (
      <div className=' flex-1 p-2 flex flex-col gap-2 overflow-auto h-full'>
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2 self-start'
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' w-1/2  self-end'
          height={50}
        />
      </div>
    );
  }
  if (error) {
    return <p>{error} </p>;
  }
  if (chats.length === 0) {
    return (
      <div className=' flex-1 p-2 flex items-end flex-col'>
        <p className=' bg-gray-200 p-2 rounded-lg cursor-pointer px-4'>
          say hi 👋
        </p>
        <p className=' text-gray-600 text-xs'>click me</p>
      </div>
    );
  }
  return (
    <div className='flex-1 flex gap-2 flex-col overflow-auto  items-start p-2'>
      {chats.map(item => (
        <Message
          messegeRef={messegeRef}
          key={item.$id}
          {...item}
        />
      ))}
    </div>
  );
};

export default Conversation;
