'use client';
import ImagePreview from '@/components/story/ImagePreview';
import StoryControls from '@/components/story/StoryControls';
import TextPreview from '@/components/story/TextPreview';
import TextSelector from '@/components/story/TextSelector';
import { useAppContext } from '@/context/AppContext';
import { Settings } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const StoryPage = () => {
  const appContext = useAppContext();
  const user = appContext?.user;

  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string>('#F02D65');
  const [text, setText] = useState<string>('');

  const [type, setType] = useState<'text' | 'image' | 'video' | null>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileType = file.type.split('/')[0];
      if (fileType === 'image' || fileType === 'video') {
        setType(fileType);
        setFile(file);
        console.log(fileType, file, 'my file inside now');
      } else {
        alert('please select a video or an image');
        return;
      }

      // setFile(file);
    }
  };
  return (
    <div className=' flex overflow-auto md:h-full flex-col-reverse md:flex-row'>
      <div className='flex md:flex-1 md:max-w-[300px] bg-white flex-col gap-2 p-2 border-b border-b-gray-500'>
        <div className=' hidden  md:flex flex-col flex-1'>
          <div className=' flex justify-between items-center'>
            <h1 className=' font-bold text-2xl text-primary'>your story</h1>
            <IconButton>
              <Settings />
            </IconButton>
          </div>
          <div className=' flex items-center gap-4'>
            <Avatar
              src={user?.profilePic}
              alt={user?.username}
              className=' size-12 md:size-24'
            />
            <h1 className=' text-primary text-lg'> {user?.username} </h1>
          </div>
          {type === 'text' && (
            <TextSelector
              setText={setText}
              text={text}
              setColor={setColor}
            />
          )}
        </div>
        {(text || file) && (
          <StoryControls
            setType={setType}
            type={type}
            setText={setText}
            setFile={setFile}
            text={text}
            color={color}
            file={file}
          />
        )}
      </div>
      {type == null && (
        <div className=' w-full md:flex-1 h-72 md:h-full flex justify-center items-center gap-2 p-2'>
          <div
            onClick={() => setType('text')}
            className=' w-full max-w-52 h-full max-h-[300px] relative'
          >
            <Image
              src={'/story.png'}
              alt='story display picture'
              fill
              className=' object-cover rounded-lg cursor-pointer'
            />
          </div>
          <div className=' w-full max-w-52 h-full max-h-[300px] relative'>
            <label htmlFor='select'>
              <Image
                src={'/storytext.png'}
                alt='story display picture'
                fill
                className=' object-cover rounded-lg cursor-pointer'
              />
            </label>
            <input
              type='file'
              onChange={handleFile}
              hidden
              id='select'
            />
          </div>
        </div>
      )}
      {(type === 'image' || (type === 'video' && file)) && (
        <ImagePreview
          file={file}
          type={type}
        />
      )}
      {type == 'text' && (
        <TextPreview
          text={text}
          color={color}
          setText={setText}
          setColor={setColor}
        />
      )}
    </div>
  );
};

export default StoryPage;
