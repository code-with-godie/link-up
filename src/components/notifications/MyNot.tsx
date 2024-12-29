'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { authService } from '@/appWrite/auth';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';
import { INotification } from '@/typings/typing';
import {
  Chat,
  DoneAll,
  Notifications,
  PersonAdd,
  ThumbUp,
} from '@mui/icons-material';
import { Avatar, CircularProgress, Skeleton } from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { format } from 'timeago.js';

type User = {
  profilePic: string;
  $id: string;
};
const MyNotification = ({
  messege,
  read,
  username,
  createAt,
  id,
  type: { type },
  senderID,
}: INotification) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<null | string>(null);
  const [accepting, setAccepting] = useState<boolean>(false);
  const [friends, setFriends] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState(true);
  const socketContext = useSocketContext();
  const appContext = useAppContext();
  const socket = socketContext?.socket;
  const [user, setUser] = useState<User | null>(null);
  const readNotification = () => {
    socket?.emit('READ_NOTIFICATION', id);
  };
  // const clearNotification = () => {
  //   socket?.emit('CLEAR_NOTIFICATION', id);
  // };
  const deleteNotification = () => {
    socket?.emit('DELETE_NOTIFICATION', id);
  };
  const acceptFriendRequest = async () => {
    try {
      if (!appContext?.user || !user) return;
      setAccepting(true);
      const res = await appwriteService.acceptFriendRequest(
        appContext?.user?.$id,
        user?.$id
      );
      if (res) {
        const { user, friend } = res;
        socket?.emit('ADD_NOTIFICATION', {
          type: { target: 'user', type: 'FRIEND_REQUEST_ACCEPTED' },
          senderID: user.$id,
          receiverID: friend?.$id,
          username: `${user?.username}`,
          messege: `accepted your friend request.you are now friends with ${user?.username}`,
        });
        appContext.updateUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAccepting(false);
    }
  };
  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const session = await authService.getUserById(senderID);
      if (session) {
        const tempUser: User = {
          $id: session.$id,
          profilePic: session?.profilePic,
        };
        setUser(tempUser);
      }
    } catch (error) {
      console.log(error);

      setError('could not configure notification');
    } finally {
      setLoading(false);
    }
  }, [senderID]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    if (appContext?.user && user) {
      setFriends(appContext?.user?.friends?.includes(user?.$id));
    }
  }, [appContext?.user, user]);
  if (loading) {
    return (
      <div className='flex gap-2 items-center'>
        <Skeleton
          variant='circular'
          width={50}
          height={50}
        />
        <Skeleton
          variant='rounded'
          className=' flex-1'
          height={50}
        />
      </div>
    );
  }

  return (
    <div className=' flex flex-col'>
      <div className=' p-2 flex items-start gap-2 rounded-lg cursor-pointer '>
        <div className=' flex  flex-1 gap-2'>
          <div className='relative self-start mr-4'>
            <Link href={`/profile/${user?.$id}`}>
              <Avatar src={user?.profilePic} />
            </Link>
            <button className=' absolute bottom-0 -right-4 z-10 text-sm '>
              {type === 'COMMENT' ? (
                <Chat className=' text-green-400 text-sm' />
              ) : type === 'PAGE_LIKE' ? (
                <ThumbUp className=' text-sm text-blue-700' />
              ) : type === 'FRIEND_REQUEST' ? (
                <PersonAdd className=' text-sm text-blue-700' />
              ) : (
                <Notifications className=' text-sm text-gray-500' />
              )}
            </button>
          </div>
          <div className=' flex flex-col gap-2 flex-1 '>
            <p className='flex-1'> {`${username} ${messege}`} </p>
          </div>
        </div>
      </div>
      <div className=' flex justify-end p-2'>
        {type === 'FRIEND_REQUEST' && (
          <button
            disabled={friends || accepting}
            onClick={acceptFriendRequest}
            className=' bg-primary text-white py-2 px-4 rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {accepting ? (
              <CircularProgress
                size={20}
                color='inherit'
              />
            ) : friends ? (
              'Accepted'
            ) : (
              'Accept'
            )}
          </button>
        )}
      </div>
      <div className=' flex flex-1 px-2'>
        <p className='flex-1 text-sm text-primary text-start'>
          {format(createAt)}
        </p>
        <button
          onClick={readNotification}
          className={`rounded-l py-1 px-2 text-sm ${
            read ? 'text-green-500 ' : 'text-gray-400 '
          } `}
        >
          <DoneAll />
        </button>

        <button
          onClick={deleteNotification}
          className=' text-red-400 py-1 px-2 text-sm rounded-l flex gap-2 items-center'
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default MyNotification;
