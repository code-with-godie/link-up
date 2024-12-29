'use client';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import AccountDetails from './AccountDetails';

const PostAvatar = ({
  username,
  userID,
  profilePic,
}: {
  username: string;
  userID: string;
  profilePic: string;
}) => {
  const [online, setOnline] = useState<boolean>(false);
  const socketContext = useSocketContext();
  const onlineUsers = socketContext?.onlineUsers;
  const appContext = useAppContext();
  const user = appContext?.user;
  // const [show, setShow] = useState(false);

  useEffect(() => {
    if (onlineUsers?.some((item: { id: string }) => item.id === userID)) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [onlineUsers, userID]);
  return (
    <div
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
      className=' relative cursor-pointer p-2'
    >
      <Link href={`/profile/${userID}`}>
        <Avatar
          src={profilePic}
          alt={username}
        />
      </Link>
      {online && user?.$id !== userID && (
        <div className=' bg-green-400 p-2 rounded-full absolute z-10 -top-1 -right-1'></div>
      )}
      {/* {show && <AccountDetails />} */}
    </div>
  );
};

export default PostAvatar;
