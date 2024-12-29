/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';
import { appwriteService } from '@/appWrite/appwriteService';
import { useAppContext } from '@/context/AppContext';
import { useSocketContext } from '@/context/SocketContext';
import { userFormatter } from '@/lib';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type MiniUser = {
  username: string;
  profilePic: string;
  coverPic?: string;
  $id: string;
  likes?: string[];
  followers?: string[];
  friends?: string[];
  friendRequest?: string[];
};
const Friend = ({ username, profilePic, $id, friendRequest }: MiniUser) => {
  const [user, setUser] = useState<MiniUser | null>(null);
  const [following, setFollowing] = useState<boolean | undefined>(false);
  const [sent, setSent] = useState<boolean | undefined>(false);
  const [receivedRequest, setRecievedRequest] = useState<boolean | undefined>(
    false
  );
  const [friends, setFriends] = useState<boolean | undefined>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isRequesting, setIsReqeust] = useState<boolean>(false);
  const [accepting, setAccepting] = useState<boolean>(false);
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;
  const loggedInUser = appContext?.user;
  const toggleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFollowing(true);
    try {
      const res = await appwriteService.follow(loggedInUser?.$id, $id);
      if (res) {
        const { user } = res;
        const tempUser = userFormatter(user);
        appContext?.updateUser(tempUser);
        if (!following) {
          toast.success(`you started following ${username}`);
          socket?.emit('ADD_NOTIFICATION', {
            type: { target: 'user', type: 'PAGE_FOLLOW' },
            senderID: loggedInUser?.$id,
            receiverID: user?.$id,
            username: `${loggedInUser?.username}`,
            messege: `started following you`,
          });
        } else {
          toast.success(`you unfollowed ${username}`);
        }
      }
    } catch (error) {
      const err = error as Error;
      const defaultMessege = following
        ? `Failed to follow ${user?.username}`
        : `Failed to unfollow ${user?.username}`;
      toast.error(err?.message || defaultMessege);
      console.log(error);
    } finally {
      setIsFollowing(false);
    }
  };
  const acceptFriendRequest = async () => {
    try {
      if (!loggedInUser || !user) return;
      setAccepting(true);
      const res = await appwriteService.acceptFriendRequest(
        loggedInUser.$id,
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
      const err = error as Error;
      toast.error(err?.message || 'Something went wrong. Try Again Later');
    } finally {
      setAccepting(false);
    }
  };
  const sendRequest = async () => {
    setIsReqeust(true);
    try {
      if (!loggedInUser) return;
      const user = await appwriteService.sendFriendRequest(
        loggedInUser?.$id,
        $id
      );
      if (user) {
        const tempUser: MiniUser = {
          username: user?.username,
          profilePic: user?.profilePic,
          coverPic: user?.coverPic,
          likes: user.likes,
          followers: user.followers,
          $id: user.$id,
          friends: user.friends,
          friendRequest: user.friendRequest,
        };
        setUser(tempUser);
        if (!friends) {
          if (!sent) {
            toast.success(`friend request sent to ${user?.username}`);
          } else {
            toast.success(`friend request removed from ${user?.username}`);
          }

          socket?.emit('ADD_NOTIFICATION', {
            type: { target: 'user', type: 'FRIEND_REQUEST' },
            senderID: loggedInUser?.$id,
            receiverID: user?.$id,
            username: `${loggedInUser?.username}`,
            messege: `sent you a friend request`,
          });
        } else {
          toast.success(`friend request already sent to ${user?.username}`);
        }
      }
    } catch (error) {
      const err = error as Error;
      const defaultMessege = `Failed to send freind request to ${user?.username}`;
      toast.error(err?.message || defaultMessege);
      console.log(error);
    } finally {
      setIsReqeust(false);
    }
  };
  const handleSendAccept = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (sent) {
      sendRequest();
    }
    if (receivedRequest) {
      acceptFriendRequest();
    }
  };
  useEffect(() => {
    if (loggedInUser) {
      setFollowing(loggedInUser?.followings?.includes($id));
      setFriends(loggedInUser?.friends?.includes($id));
      setSent(user?.friendRequest?.includes(loggedInUser?.$id));
      user &&
        setRecievedRequest(loggedInUser?.friendRequest?.includes(user?.$id));
    }
  }, [loggedInUser, $id, user]);

  useEffect(() => {
    setUser({ username, profilePic, $id, friendRequest });
  }, [$id, friendRequest, profilePic, setUser, username]);
  return (
    <div className=' cursor-pointer flex-1 bg-white p-2 rounded-lg flex'>
      <div className='flex0 flex-col w-full'>
        <div className='flex flex-col gap-2 flex-1'>
          <div className=' w-full relative h-72 md:h-56'>
            <Image
              fill
              src={profilePic}
              alt='profile'
              className=' mx-auto rounded-tr-lg rounded-tl-lg object-cover'
            />
          </div>
          <h1 className=' p-2 font-mono text-lg'> {user?.username} </h1>
        </div>

        <div className='flex flex-col gap-2'>
          {friends ? (
            <button className='bg-primary p-3 text-white rounded-lg'>
              friends
            </button>
          ) : sent || receivedRequest ? (
            <button
              onClick={handleSendAccept}
              className=' bg-primary p-3 rounded-lg'
            >
              {isRequesting ? (
                <CircularProgress
                  size={20}
                  color='secondary'
                />
              ) : sent ? (
                'cancel request'
              ) : accepting ? (
                <CircularProgress
                  size={20}
                  color='secondary'
                />
              ) : (
                'accept friend request'
              )}
            </button>
          ) : (
            <button
              disabled={isRequesting}
              onClick={sendRequest}
              className=' bg-gray-200 p-3 rounded-lg'
            >
              {isRequesting ? (
                <CircularProgress
                  size={20}
                  color='secondary'
                />
              ) : (
                'send friendRequest'
              )}
            </button>
          )}
          {following ? (
            <button
              className='bg-primary p-3 text-white rounded-lg'
              onClick={toggleFollow}
            >
              {isFollowing ? (
                <CircularProgress
                  size={20}
                  color='secondary'
                />
              ) : (
                ' unfollow'
              )}
            </button>
          ) : (
            <button
              onClick={toggleFollow}
              className=' bg-gray-200 p-3 rounded-lg'
            >
              {isFollowing ? (
                <CircularProgress
                  size={20}
                  color='secondary'
                />
              ) : (
                'follow'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
