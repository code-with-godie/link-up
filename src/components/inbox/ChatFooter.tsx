'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import {
  ISms,
  Conversation as IConversation,
  IMessage,
} from '@/typings/typing';
import { EmojiEmotionsOutlined, Send, ThumbUp } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import CustomEmojiPicker from '../emojiPicker/CustomEmojiPicker';
import toast from 'react-hot-toast';

const ChatFooter = ({
  conversation,
  setChats,
}: {
  setChats: React.Dispatch<React.SetStateAction<IMessage[]>>;
  conversation: IConversation;
}) => {
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowPicker(false);
  };
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState('');
  const [send, setSend] = useState(false);
  const appContext = useAppContext();
  const user = appContext?.user;
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!message) return;
      if (conversation && user) {
        setSend(true);
        const sms: ISms = {
          receiver: conversation?.receiverID,
          sender: user?.$id,
          room: conversation.roomID,
          title: message,
        };
        const newSms = await appwriteService.createMessage(sms);

        if (newSms) {
          const newMessage: IMessage = {
            receiver: newSms?.receiver,
            sender: newSms?.sender,
            room: newSms?.room,
            title: newSms?.title,
            $id: newSms?.$id,
            deletedBy: newSms?.deletedBy,
            $createdAt: newSms?.$createdAt,
          };
          setChats(prev => [...prev, newMessage]);
          setMessage('');
        }
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to sent a messege');
      console.log(error);
    } finally {
      setSend(false);
    }
  };
  return (
    <div className=' bg-white p-2 flex gap-2 items-center my-shadow relative'>
      <form
        onSubmit={sendMessage}
        className='flex items-center rounded-2xl bg-gray-200 flex-1'
      >
        <input
          placeholder='message...'
          className=' border-none bg-transparent outline-none flex-1 text-sm p-2'
          // onFocus={() => setShowPicker(false)}
          value={message}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setMessage(e.target.value)
          }
        />
        {message !== '' && (
          <button className=' text-primary'>
            {' '}
            {send ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton>
                {' '}
                <Send />{' '}
              </IconButton>
            )}{' '}
          </button>
        )}
      </form>
      <IconButton
        className='btn'
        onClick={() => setShowPicker(prev => !prev)}
      >
        <EmojiEmotionsOutlined className=' text-primary text-2xl' />
      </IconButton>
      <IconButton className='btn'>
        <ThumbUp className=' text-primary text-2xl' />
      </IconButton>
      <IconButton className='btn'>
        <FaMicrophone className=' text-primary text-2xl' />
      </IconButton>
      {showPicker && <CustomEmojiPicker onEmojiClick={onEmojiClick} />}
    </div>
  );
};

export default ChatFooter;
