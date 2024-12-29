'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';
import BackgroundSelector from './BackgroundSelector';

const TextPost = ({
  text,
  setText,
  onEmojiClick,
  setColor,
  color,
}: {
  text: string;
  color: string;
  setText: (value: string) => void;
  setColor: (value: string) => void;
  onEmojiClick: (emojiObject: { emoji: string }) => void;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showbg, setShowBg] = useState<boolean>(false);
  return (
    <div className=' flex flex-col gap-2'>
      <div className=' h-40 w-full'>
        <form
          // onSubmit={postComment}
          className=' px-2 flex items-start rounded-2xl flex-1 h-full'
        >
          <textarea
            style={{ background: color }}
            placeholder='what is on your mind?...'
            className={`border-none bg-transparent outline-none flex-1 placeholder:text-gray-600  resize-none h-full text-2xl p-2 ${
              color === 'white' ? 'text-black' : ' text-white'
            }`}
            onFocus={() => setShowPicker(false)}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <IconButton
            className='btn'
            onClick={() => setShowPicker(prev => !prev)}
          >
            <EmojiEmotionsOutlined className=' text-primary text-2xl' />
          </IconButton>
          {showPicker && (
            <div>
              <EmojiPicker
                searchDisabled
                className='emoji-picker'
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
        </form>
      </div>
      <div className='flex relative'>
        <div
          onClick={() => setShowBg(prev => !prev)}
          className=' gradient p-2 font-bold text-white cursor-pointer rounded-lg'
        >
          Aa
        </div>
        {showbg && (
          <BackgroundSelector
            setShowBg={setShowBg}
            setColor={setColor}
          />
        )}
      </div>
    </div>
  );
};

export default TextPost;
