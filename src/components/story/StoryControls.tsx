'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
type Story = {
  url?: string;
  user: string;
  type: 'image' | 'video' | 'text';
  text?: string;
  bg?: string;
  expiresAt: Date;
};
const StoryControls = ({
  setType,
  type,
  text,
  color,
  file,
  setText,
  setFile,
}: {
  text?: string;
  color?: string;
  file?: File | null;
  type: 'image' | 'text' | 'video' | null;
  setType: (value: 'text' | 'image' | 'video' | null) => void;
  setText: (text: string) => void;
  setFile: (value: null) => void;
}) => {
  const appContext = useAppContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = appContext?.user;
  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('story before');

      if (!user) return;
      if (!type) return;
      console.log('story after');
      const story: Story = {
        type,
        user: user?.$id,
        text,
        bg: color,
        //update this later on
        expiresAt: new Date(),
      };
      if (type !== 'text' || !file) {
        toast.error('Please select a file to upload ⛔⛔');
        return;
      }
      const newStory = await appwriteService.createStory(story, file);
      if (newStory) {
        appContext.updateStories(newStory);
        router.push('/');
      }
    } catch (error) {
      const err = error as Error;
      toast.error(
        err.message ||
          'Something went wrong uploading the story.try again Later 😩😩'
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    setText('');
    setType(null);
    setFile(null);
  };

  return (
    <div className=' py-4  px-1 flex items-center justify-between'>
      <button
        onClick={cancel}
        className=' py-2 px-4 rounded-lg bg-gray-500 cursor-pointer text-white'
      >
        Cancel
      </button>
      <button
        disabled={loading}
        onClick={handleSubmit}
        className=' py-2 px-4 rounded-lg bg-primary cursor-pointer text-white disabled:bg-primary disabled:cursor-not-allowed'
      >
        {loading ? (
          <div className=' text-white flex justify-center ice\'>
            <CircularProgress
              size={20}
              color='inherit'
            />
          </div>
        ) : (
          ' Save story'
        )}
      </button>
    </div>
  );
};

export default StoryControls;
