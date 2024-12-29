import { Avatar } from '@mui/material';
import React from 'react';
import Introduction from '../introduction/Introduction';
import { Conversation as IConversation } from '@/typings/typing';
import { ChatBubbleTwoTone } from '@mui/icons-material';
const ChatDescription = ({
  conversation,
}: {
  conversation: IConversation | null;
}) => {
  if (!conversation) {
    return (
      <div className='hidden  bg-white p-2  lg:flex flex-col gap-4 items-center justify-center'>
        <ChatBubbleTwoTone />
        <h1>open a chat to see chat description</h1>
      </div>
    );
  }
  return (
    <div className='hidden lg:flex w-1/4 max-w-[300px] p-2 bg-white  flex-col gap-2 items-start '>
      <div className=' flex items-center justify-center  flex-col gap-2 pl-10'>
        <Avatar
          src={conversation.profilePic}
          className=' size-24'
        />
        <p className=' font-medium'> {conversation.username} </p>
      </div>
      <Introduction
        center
        userID={conversation?.receiverID}
      />
    </div>
  );
};

export default ChatDescription;
