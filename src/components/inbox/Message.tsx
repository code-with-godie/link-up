'use client';
import { useAppContext } from '@/context/AppContext';
import { IMessage } from '@/typings/typing';
import Image from 'next/image';
import React from 'react';
import { format } from 'timeago.js';

const Message = ({
  title,
  receiver,
  sender,
  $createdAt,
  messegeRef,
}: IMessage) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const mine = user?.$id === sender.$id;
  return (
    <div
      ref={messegeRef}
      className={`flex flex-col p-2 rounded-2xl max-w-[70%]${
        mine ? ' self-end' : ' self-start'
      }`}
    >
      <div className={`flex items-start  gap-1`}>
        {!mine && (
          <Image
            src={receiver?.profilePic}
            alt={receiver?.username}
            width={30}
            height={30}
            className=' size-5  object-cover rounded-full'
          />
        )}
        <p className='bg-gray-100 p-2 rounded-md'> {title} </p>
      </div>
      <p className='text-xs font-mono text-end text-gray-500 '>
        {' '}
        {format($createdAt)}{' '}
      </p>
    </div>
  );
};

export default Message;
