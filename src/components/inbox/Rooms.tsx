'use client';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import Room from './Room';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Models } from 'appwrite';
import { Conversation as IConversation, Room as IRoom } from '@/typings/typing';
import SuggestedAccountSkelton from '../skeleton/SuggestedAccountSkelton';
import Image from 'next/image';
import toast from 'react-hot-toast';

const Rooms = ({
  setConversation,
  conversation,
}: {
  setConversation: (value: IConversation) => void;
  conversation: boolean;
}) => {
  const appContext = useAppContext();
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const user = appContext?.user;
  const router = useRouter();
  const [loading, setLoaing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRooms = useCallback(async () => {
    try {
      setLoaing(true);
      if (!user) return;
      const res: Models.Document[] = await appwriteService.getUserRooms(
        user.$id
      );

      const rooms: IRoom[] = res.map((doc: Models.Document) => ({
        members: doc?.members,
        last_message: doc?.last_message,
        $id: doc.$id,
      }));
      setRooms(rooms);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to Load rooms');
      setError('could not load rooms');
      console.log(error);
    } finally {
      setLoaing(false);
    }
  }, [user]);
  useEffect(() => {
    getRooms();
  }, [getRooms]);
  if (!user) {
    router.push('/sign-in');
    return;
  }
  if (loading) {
    return <SuggestedAccountSkelton />;
  }
  if (error) {
    return <p> {error} </p>;
  }

  return (
    <div
      className={`flex-1 sm:max-w-[300px] border-t-2 border-gray-100 sm:w-1/4 min-w-[200px] flex-col gap-2 bg-white p-2 ${
        conversation ? 'hidden sm:flex' : 'flex'
      }`}
    >
      <div className=' flex justify-between items-center'>
        <h1 className=' text-2xl font-semibold text-primary'>Inbox</h1>
        <div className=' flex gap-2'>
          <IconButton>
            <MoreHoriz className=' text-primary' />
          </IconButton>
          <IconButton>
            <MdEdit className=' text-primary' />
          </IconButton>
        </div>
      </div>
      <div className=' p-2 bg-gray-200 rounded-2xl flex'>
        <input
          placeholder='search inbox...'
          className=' border-none flex-1 outline-none bg-transparent font-thin text-lg'
        />
      </div>
      <div className=' flex-1 flex flex-col gap-2 overflow-auto p-1'>
        {rooms.length === 0 ? (
          <div>
            <Image
              src={'/chats.png'}
              alt='no chats'
              width={100}
              height={100}
              className=' object-contain'
            />
            <h1 className=' font-bold text-lg'>say hi</h1>
            <p className=' tesm text-gray-500'>
              looking to strike up a conversation. go to any users profile and
              start messeging
            </p>
          </div>
        ) : (
          rooms.map(item => (
            <Room
              setConversation={setConversation}
              {...item}
              key={item.$id}
              last_message='hi '
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Rooms;
