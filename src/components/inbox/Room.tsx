'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';
import { Room as IRoom } from '@/typings/typing';
import { Avatar, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

type User = {
  profilePic: string;
  $id: string;
  username: string;
};
const Room = ({ last_message, members, setConversation, $id }: IRoom) => {
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const loggedInUser = appContext?.user;
  const onlineUsers = socketContext?.onlineUsers;
  const [user, setUser] = useState<User | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const otherUserID = members.find(item => item !== loggedInUser?.$id);
  const getUser = useCallback(async () => {
    try {
      if (otherUserID) {
        setLoading(true);
        const res = await appwriteService.getUserById(otherUserID);
        const user: User = {
          profilePic: res?.profilePic,
          $id: res?.$id,
          username: res?.username,
        };
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [otherUserID]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (onlineUsers?.some((item: { id: string }) => item.id === otherUserID)) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [onlineUsers, otherUserID]);

  if (loading) {
    return (
      <div className=' flex gap-2 items-center'>
        <Skeleton
          variant='circular'
          className=' w-full'
          height={50}
          width={50}
        />
        <Skeleton
          variant='rounded'
          className='  flex-1'
          height={50}
        />
      </div>
    );
  }

  return (
    <div
      className=' flex gap-2 items-center hover:bg-gray-100 p-2 cursor-pointer'
      onClick={() =>
        setConversation &&
        user &&
        setConversation({
          username: user?.username,
          profilePic: user?.profilePic,
          roomID: $id,
          receiverID: user?.$id,
        })
      }
    >
      <div className=' relative'>
        <Avatar src={user?.profilePic} />
        {online && (
          <div className=' bg-green-400 p-2 rounded-full absolute z-10 -top-1 -right-1'></div>
        )}
      </div>
      <div className=' flex flex-col '>
        <h1 className=' text-xl font-thin'> {user?.username} </h1>
        <div className=' flex items-center text-gray-300 text-sm'>
          {' '}
          <p> {last_message || ''} </p>. <p> 1yr </p>{' '}
        </div>
      </div>
    </div>
  );
};

export default Room;
