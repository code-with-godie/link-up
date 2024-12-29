'use client';
import { Close, Info, Phone, VideoCall } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ChatFooter from './ChatFooter';
import Conversation from './Conversation';
import { Conversation as IConversation, IMessage } from '@/typings/typing';
import { useSocketContext } from '@/context/SocketContext';

const Chats = ({
  chats,
  conversation,
  setConversation,
  setChats,
}: {
  conversation: IConversation;
  chats: IMessage[];
  setConversation: (value: IConversation | null) => void;
  setChats: React.Dispatch<React.SetStateAction<IMessage[]>>;
}) => {
  const socketContext = useSocketContext();
  const onlineUsers = socketContext?.onlineUsers;
  const [online, setOnline] = useState<boolean | undefined>(false);
  const messegeRef = useRef<HTMLDivElement | null>(null);
  // const messegeRef = useRef<React.LegacyRef<HTMLDivElement>>(null);
  useEffect(() => {
    if (messegeRef.current) {
      messegeRef.current?.scrollIntoView();
    }
  }, [chats]);

  useEffect(() => {
    if (
      onlineUsers?.some(
        (item: { id: string }) => item.id === conversation?.receiverID
      )
    ) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [onlineUsers, conversation]);
  return (
    <div
      className={`flex-1 bg-white flex-col border-x-2 border-t-2 border-gray-100 ${
        conversation ? 'flex' : 'hidden'
      } `}
    >
      {/* ===============chat header start================= */}
      <div className=' flex justify-between items-center my-shadow p-2 '>
        <div className=' flex gap-2 items-center cursor-pointer'>
          <IconButton>
            <Avatar src={conversation?.profilePic} />
          </IconButton>
          <div className=' flex flex-col '>
            <h1 className=' text-base md:text-xl font-thin'>
              {' '}
              {conversation?.username}{' '}
            </h1>
            {online ? (
              <p className=' text-sm text-green-500'>online</p>
            ) : (
              <p className=' text-sm text-gray-400'>offline</p>
            )}
          </div>
        </div>
        <div>
          <IconButton>
            <Phone
              // fontSize='large'
              className=' text-primary text-lg'
            />
          </IconButton>
          <IconButton>
            <VideoCall
              className=' text-primary text-lg'
              // fontSize='large'
            />
          </IconButton>
          <IconButton>
            <Info
              className=' text-primary text-lg'
              // fontSize='large'
            />
          </IconButton>
          <IconButton
            onClick={() => setConversation(null)}
            className='sm:hidden'
          >
            <Close
              className=' text-primary text-lg '
              // fontSize='large'
            />
          </IconButton>
        </div>
      </div>
      {/* ===============chat header ends================= */}
      <Conversation
        messegeRef={messegeRef}
        setChats={setChats}
        chats={chats}
        conversation={conversation}
      />
      <ChatFooter
        setChats={setChats}
        conversation={conversation}
      />
    </div>
  );
};

export default Chats;
