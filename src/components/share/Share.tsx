'use client';
import { Avatar } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { useAppContext } from '@/context/AppContext';
import ShareIconItem from './ShareIconItem';
import { useState } from 'react';
import Model from '../models/Model';
import NewPost from '../new/NewPost';

const Share = ({ home }: { home?: boolean }) => {
  const [caption, setCaption] = useState<string>('');
  const [showModel, setShowModel] = useState<boolean>(false);
  const appContext = useAppContext();
  const user = appContext?.user;

  return (
    <div className='flex flex-col gap-2 p-4 my-shadow'>
      <div className='flex gap-2 items-center'>
        <Avatar src={user?.profilePic} />
        <div className='flex-1 flex p-2 bg-gray-100 rounded-2xl'>
          <input
            type='text'
            value={caption}
            className='flex-1 bg-transparent outline-none border-none text-base'
            onChange={e => setCaption(e.target.value)}
            placeholder={`What is on your mind ${user?.username || ''} ?`}
          />
        </div>
      </div>
      <hr />
      <div className='flex items-center gap-2 justify-between'>
        <ShareIconItem
          Icon={VideoCameraBackIcon}
          label='live video'
          onclickHandler={() => {}}
        />
        <ShareIconItem
          Icon={PermMediaIcon}
          flag='two'
          onclickHandler={() => {
            setShowModel(true);
          }}
          label='photo or video'
        />
      </div>
      {showModel && (
        <Model>
          <NewPost
            home={home}
            close={setShowModel}
          />
        </Model>
      )}
    </div>
  );
};

export default Share;
