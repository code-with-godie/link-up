'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ChatDescription from '@/components/inbox/ChatDescription';
import Chats from '@/components/inbox/Chats';
import Rooms from '@/components/inbox/Rooms';
import { Conversation as IConversation, IMessage } from '@/typings/typing';
import { Message } from '@mui/icons-material';
import { appwriteService } from '@/appWrite/appwriteService';
import { appwriteConfig } from '@/appWrite/appConfig';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
const Messeger = () => {
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [chats, setChats] = useState<IMessage[]>([]);
  const appContext = useAppContext();
  const user = appContext?.user;
  const realTime = useCallback(() => {
    try {
      return appwriteService.client.subscribe(
        `databases.${appwriteConfig.appWriteDatabase}.collections.${appwriteConfig.appWriteMessegesCollectionID}.documents`,
        response => {
          if (
            response.events.includes(
              'databases.*.collections.*.documents.*.create'
            )
          ) {
            const { payload: incominPayload } = response;
            //handle other user chats
            const payload = incominPayload as IMessage;
            if (
              payload?.room?.$id === conversation?.roomID &&
              payload?.receiver?.$id === user?.$id
            ) {
              setChats(prev => [...prev, payload]);
            }
          }
        }
      );
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Something went wrong');
      console.log(error);
    }
  }, [user, conversation]);
  useEffect(() => {
    const unsubscribe = realTime();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [realTime]);
  return (
    <div className='flex flex-1 overflow-auto'>
      <Rooms
        conversation={conversation ? true : false}
        setConversation={setConversation}
      />
      {conversation ? (
        <Chats
          chats={chats}
          setChats={setChats}
          setConversation={setConversation}
          conversation={conversation}
        />
      ) : (
        <div className=' hidden sm:flex justify-center items-center gap-4 flex-col flex-1'>
          <Message className=' text-5xl text-primary' />
          <p className=' text-sm'>open a conversation to see chats</p>
        </div>
      )}
      <ChatDescription conversation={conversation} />
    </div>
  );
};

export default Messeger;
