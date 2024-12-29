'use client';
import {
  Home,
  KeyboardArrowRight,
  Logout,
  OndemandVideo,
  People,
  Search,
} from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBars, FaFacebookMessenger } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import Model from '../models/Model';
import Sidenav from '@/components/nav/Sidenav';
import { useAppContext } from '@/context/AppContext';
import Notifications from '../notifications/Notifications';
import { useSocketContext } from '@/context/SocketContext';
import { authService } from '@/appWrite/auth';
const Mobilenav = () => {
  const appContext = useAppContext();
  const socketContext = useSocketContext();
  const notifications = socketContext?.notifications;
  const showNots = appContext?.setShowNotification;
  const [nots, setNots] = useState(0);
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    authService.logout().then(() => {
      appContext?.toggleDrawer();
    });
  };
  useEffect(() => {
    const tempNots = notifications?.filter(item => item.read === false);
    if (tempNots) {
      setNots(tempNots?.length);
    }
  }, [notifications]);

  return (
    <div className=' flex flex-col gap-2 md:hidden p-2 bg-white my-shadow'>
      <div className=' flex items-center justify-between'>
        <div>
          <h1 className=' font-bold  text-3xl text-primary'>link up</h1>
        </div>
        <div>
          <IconButton className='btn'>
            <Search className='icon' />
          </IconButton>
          <IconButton
            className=''
            onClick={appContext?.toggleDrawer}
          >
            <FaBars className='icon' />
          </IconButton>
        </div>
      </div>
      <div className=' flex justify-between gap-2 items-center p-2'>
        <Link href='/'>
          <IconButton>
            <Home
              fontSize='large'
              className=' text-3xl'
            />
          </IconButton>
        </Link>
        <Link href='/friends'>
          <IconButton>
            <People
              fontSize='large'
              className=' text-5xl'
            />
          </IconButton>
        </Link>
        <Link href='/messeger'>
          <Badge
            className=' text-5xl'
            style={{ cursor: 'pointer' }}
            color='error'
            badgeContent={'0'}
          >
            <FaFacebookMessenger
              fontSize='large'
              className='icon'
            />
          </Badge>
        </Link>
        <Link href='/watch'>
          <IconButton>
            <OndemandVideo
              fontSize='large'
              className='icon'
            />
          </IconButton>
        </Link>
        <IconButton onClick={() => showNots && showNots(true)}>
          <Badge
            color='error'
            className=' text-5xl'
            style={{ cursor: 'pointer' }}
            badgeContent={`${nots}`}
          >
            <IoMdNotifications
              fontSize='large'
              className='icon'
            />
          </Badge>
        </IconButton>
      </div>
      {appContext?.showDrawer && (
        <Model>
          <div
            onClick={appContext?.toggleDrawer}
            className=' h-screen w-screen  flex  justify-end cursor-pointer'
          >
            <div className='bg-white w-full max-w-[250px] divide-y-2 flex flex-col gap-2'>
              <Sidenav />
              <div className=' text-white bg-primary flex gap-2 items-center p-4 hover:bg-primary/90 cursor-pointer'>
                <div
                  onClick={handleLogout}
                  className=' flex gap-2 items-center flex-1'
                >
                  <Logout />
                  <p className=''>Logout</p>
                </div>
                <KeyboardArrowRight />
              </div>
            </div>
          </div>
        </Model>
      )}
      <Notifications />
    </div>
  );
};

export default Mobilenav;
