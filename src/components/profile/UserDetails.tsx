'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CameraAlt,
  Edit,
  Person,
  PersonOutline,
  ThumbUp,
} from '@mui/icons-material';
import Image from 'next/image';
import { BsMessenger, BsPlus } from 'react-icons/bs';
import { User } from '@/typings/typing';
import { authService } from '@/appWrite/auth';
import { useAppContext } from '@/context/AppContext';
import { appwriteService } from '@/appWrite/appwriteService';
import { useSocketContext } from '@/context/SocketContext';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Toast from '../models/Toast';
import { userFormatter } from '@/lib';
import Link from 'next/link';
import Followers from '../followers/Followers';
import toast from 'react-hot-toast';
const UserDetails = ({ userID }: { userID: string }) => {
  //decrations
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const socket = socketContext?.socket;
  const loggedInUser = appContext?.user;
  const [user, setUser] = useState<User | null>(null);
  const [pictureType, setPictureType] = useState<string>('');
  const [coverPicture, setCoverPic] = useState<File | null>(null);
  const [profilePic, setProfilePicture] = useState<File | null>(null);
  const [showtoast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingPicture, setSavingPicture] = useState<boolean>(false);
  const [sendSms, setSendSMs] = useState<boolean>(false);
  const router = useRouter();
  const [following, setFollowing] = useState<boolean | undefined>(
    loggedInUser?.followings?.includes(userID)
  );
  const [liked, setLiked] = useState<boolean | undefined | null>(false);

  //component controllers
  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const session = await authService.getUserById(userID);
      if (session) {
        const tempUser = userFormatter(session);
        setUser(tempUser);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Something went wrong.Try Again Later`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userID]);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setPictureType(type);
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.split('/')[0] !== 'image') {
      toast.error('only images are allowed ⛔⛔ ');
      return;
    }
    if (type === 'coverPic') {
      setCoverPic(file);
    } else {
      setProfilePicture(file);
    }
    setShowToast(true);
  };
  const toggleFollow = async () => {
    try {
      const res = await appwriteService.follow(loggedInUser?.$id, userID);
      if (res) {
        const { user, follow } = res;
        const tempUser = userFormatter(user);
        const tempFollowUser = userFormatter(follow);
        setUser(tempFollowUser);
        appContext?.updateUser(tempUser);
        if (!following) {
          toast.success(`you started following ${tempFollowUser?.username}`);
          socket?.emit('ADD_NOTIFICATION', {
            type: { target: 'user', type: 'PAGE_FOLLOW' },
            senderID: loggedInUser?.$id,
            receiverID: user?.$id,
            username: `${loggedInUser?.username}`,
            messege: `started following you`,
          });
        } else {
          toast.success(`you unfollowed ${tempFollowUser?.username}`);
        }
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Something went wrong.Try Again Later`);
      console.log(error);
    }
  };
  const toggleLike = async () => {
    try {
      const user = await appwriteService.like(loggedInUser?.$id, userID);
      if (user) {
        const tempUser = userFormatter(user);
        setUser(tempUser);
        if (!liked) {
          toast.success(`you liked ${tempUser?.username} page`);
          socket?.emit('ADD_NOTIFICATION', {
            type: { target: 'user', type: 'PAGE_LIKE' },
            senderID: loggedInUser?.$id,
            receiverID: user?.$id,
            username: `${loggedInUser?.username}`,
            messege: ` liked you page`,
          });
        } else {
          toast.success(`you unliked ${tempUser?.username} page`);
        }
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Failed to like users page`);
      console.log(error);
    }
  };

  const messege = async () => {
    try {
      setSendSMs(true);
      const id = loggedInUser?.$id;
      if (!id) return;
      const res = await appwriteService.createRoom([id, userID]);
      if (res) {
        router.push('/messeger');
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Failed to create a  chat rooms`);
      console.log(error);
    } finally {
      setSendSMs(false);
    }
  };

  const cancelPicture = () => {
    if (pictureType === 'coverPic') {
      setCoverPic(null);
    } else {
      setProfilePicture(null);
    }
    setShowToast(false);
    setPictureType('');
  };
  const savePicture = async () => {
    try {
      setSavingPicture(true);
      const name = pictureType === 'coverPic' ? 'coverPic' : 'profilePic';
      const value = pictureType === 'coverPic' ? coverPicture : profilePic;
      const data = {
        type: name,
        file: value,
        userID: loggedInUser?.$id,
      };
      const user = await appwriteService.updateProfile(data);
      if (user) {
        const tempUser = userFormatter(user);
        appContext?.updateUser(tempUser);
        setUser(tempUser);
        setPictureType('');
        cancelPicture();
        toast.success(
          `successfully updated ${
            name === 'coverPic' ? 'cover picture' : 'profile picture'
          }`
        );
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || `Something went wrong.Try Again Later`);
      console.log(error);
    } finally {
      setSavingPicture(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    if (loggedInUser) {
      setFollowing(loggedInUser?.followings?.includes(userID));
    }
  }, [loggedInUser, userID]);
  useEffect(() => {
    if (user) {
      const tempId = loggedInUser ? loggedInUser?.$id : '';
      const liked = user?.likes?.includes(tempId);
      setLiked(liked);
    }
  }, [loggedInUser, user]);

  if (loading)
    return (
      <div className=' flex justify-center p-2 relative  pb-10 md:pb-16'>
        <div className=' w-full max-w-[1000px] h-[40vh] md:h-[70vh] relative '>
          <div className=' w-full h-full bg-gray-300 rounded-lg animate' />
          <div className=' size-20 md:size-32 absolute z-10 left-4  -bottom-10 md:-bottom-16 rounded-full bg-gray-400 animate' />
        </div>
      </div>
    );
  if (!user) return <p>could not load user</p>;
  return (
    <div className=' sm:min-h-[80vh] bg-gradient-to-b from-gray-300 to-white flex justify-center'>
      <div className=' w-full max-w-[1000px] p-2'>
        <div className=' w-full h-72 sm:h-96 rounded-lg relative'>
          <Image
            alt='cover'
            src={
              coverPicture
                ? URL.createObjectURL(coverPicture)
                : user?.coverPic
                ? user?.coverPic
                : '/cover.png'
            }
            fill
            className=' rounded-lg object-cover'
          />
          {loggedInUser?.$id === userID && (
            <label
              htmlFor='cover'
              className=' p-2 bg-gray-200 cursor-pointer capitalize rounded-lg px-4 absolute bottom-2 right-2 flex items-center gap-2'
            >
              {' '}
              <CameraAlt />{' '}
              <p className='hidden sm:block sm:text-xs md:text-base'>
                edit cover photo
              </p>{' '}
              <input
                type='file'
                hidden
                id='cover'
                onChange={e => handleFile(e, 'coverPic')}
              />
            </label>
          )}
        </div>
        <div className=' relative flex '>
          <div className=' flex-1 flex gap-4 p-2 flex-col items-start content-start  sm:flex-row'>
            <div className=' relative pl-4 -top-16 '>
              <Image
                alt='profile'
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : user?.profilePic
                }
                width={180}
                height={180}
                className=' rounded-full relative border-4 border-white object-cover'
              />

              {loggedInUser?.$id === userID && (
                <label
                  htmlFor='profile'
                  className='bg-gray-200/90 absolute bottom-4 left-[80%] z-10 p-2 rounded-full cursor-pointer'
                >
                  <CameraAlt className=' text-black/80' />
                </label>
              )}
              <input
                type='file'
                hidden
                id='profile'
                onChange={e => handleFile(e, 'profilePic')}
              />
            </div>
            <div className=' relative -top-14 sm:static sm:top-0 flex flex-col gap-2 p-2 flex-1'>
              <h1 className=' font-semibold text-2xl'> {user?.username} </h1>
              {user?.followers && (
                <p className=' text-gray-600'>
                  {' '}
                  {user?.followers?.length > 0
                    ? `${
                        user?.followers?.length === 1
                          ? '1 follower'
                          : `${user?.followers?.length} followers`
                      }`
                    : 'no followers yet'}{' '}
                </p>
              )}
              <Followers user={user} />
            </div>
            <div className='relative -top-14 sm:static sm:top-0 flex gap-2 sm:self-center flex-col p-2'>
              {loggedInUser?.$id === userID ? (
                <div className='flex gap-2 items-center sm:flex-col'>
                  <Link
                    href='/story'
                    className=' cursor-pointer flex items-center gap-2 bg-primary p-2 rounded-lg text-white h-10'
                  >
                    {' '}
                    <BsPlus className=' text-4xl text-white' /> add to story{' '}
                  </Link>
                  <button className=' cursor-pointer flex items-center gap-2 bg-gray-200 p-2 rounded-lg h-10'>
                    {' '}
                    <Edit className=' text-black/90' /> edit profile{' '}
                  </button>
                </div>
              ) : (
                <div className='flex gap-2 items-center sm:flex-col'>
                  <button
                    className={`cursor-pointer flex items-center gap-2  p-2 rounded-lg h-10 ${
                      following ? ' bg-primary text-white' : 'bg-gray-200'
                    }`}
                    onClick={toggleFollow}
                  >
                    {' '}
                    {following ? (
                      <Person className='text-white' />
                    ) : (
                      <PersonOutline />
                    )}
                    <p className='text-xs sm:text-base'>
                      {' '}
                      {following ? 'unfollow' : 'follow'}
                    </p>
                  </button>
                  <button
                    onClick={messege}
                    className=' cursor-pointer flex items-center gap-2 bg-gray-200 p-2 rounded-lg h-10'
                  >
                    {sendSms ? (
                      <CircularProgress size={20} />
                    ) : (
                      <>
                        <BsMessenger className='' />
                        <p className='text-xs sm:text-base'>messege</p>
                      </>
                    )}
                  </button>
                  <button
                    onClick={toggleLike}
                    className={`cursor-pointer flex items-center gap-2  p-2 rounded-lg h-10 ${
                      liked ? ' bg-primary text-white' : 'bg-gray-200'
                    }`}
                  >
                    {' '}
                    <ThumbUp
                      className={`${liked ? 'text-white' : 'text-black/90'}`}
                    />
                    <p className='text-xs sm:text-base'>
                      {' '}
                      {liked ? 'unlike' : 'like'}{' '}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showtoast && (
        <Toast
          loading={savingPicture}
          cancel={cancelPicture}
          save={savePicture}
        />
      )}
    </div>
  );
};

export default UserDetails;
