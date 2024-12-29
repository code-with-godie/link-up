import EmojiPicker from 'emoji-picker-react';
import React from 'react';

const CustomEmojiPicker = ({
  onEmojiClick,
}: {
  onEmojiClick: (emojiObject: { emoji: string }) => void;
}) => {
  return (
    <div className=' bg-white my-shadow w-screen max-w-[250px] h-[200px]  right-0 rounded-lg absolute z-50 bottom-full  overflow-auto'>
      <EmojiPicker
        searchDisabled
        className='emoji-picker'
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default CustomEmojiPicker;
