'use client';
import React, { useEffect, useState } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Notifications from '../notifications/Notifications';
import { useSocketContext } from '@/context/SocketContext';
import AccountModel from '../account/AccountModel';
const UserControl = () => {
  const [nots, setNots] = useState(0);
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const user = appContext?.user;
  const showNots = appContext?.setShowNotification;
  const setIsOpen = appContext?.setProfilePic;
  const notifications = socketContext?.notifications;
  const router = useRouter();

  useEffect(() => {
    const tempNots = notifications?.filter(item => item.read === false);
    if (tempNots) {
      setNots(tempNots?.length);
    }
  }, [notifications]);

  return (
    <div className='flex items-center gap-2 px-4'>
      <Tooltip
        title='messenger'
        arrow
      >
        <span>
          <IconButton
            onClick={() => router.push('/messeger')}
            className='btn'
          >
            <Badge
              badgeContent='0'
              color='error'
            >
              <FaFacebookMessenger className=' text-primary text-2xl' />{' '}
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title='notifications'
        arrow
      >
        <span>
          <IconButton
            onClick={() => showNots && showNots(true)}
            className='btn'
          >
            <Badge
              badgeContent={`${nots}`}
              color='error'
            >
              <IoMdNotifications className=' text-primary text-2xl' />{' '}
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title='profile'
        arrow
      >
        <IconButton
          onClick={() => setIsOpen && setIsOpen((prev: boolean) => !prev)}
        >
          <Avatar
            alt='profile picture'
            src={user?.profilePic}
            className=' w-14 h-14'
          />
        </IconButton>
      </Tooltip>
      <Notifications />
      <AccountModel />
    </div>
  );
};

export default UserControl;
