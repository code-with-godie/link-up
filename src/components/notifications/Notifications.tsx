'use client';
import MyNotification from '@/components/notifications/MyNot';
import { useSocketContext } from '@/context/SocketContext';
import { useAppContext } from '@/context/AppContext';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
// import { useEffect, useState } from 'react';
const Notifications = () => {
  const socketContext = useSocketContext();
  const appContext = useAppContext();
  const isOpen = appContext?.showNotifcation;
  const onClose = appContext?.setShowNotification;
  const notifications = socketContext?.notifications;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-[300px] pt-4 bg-gray-400 my-shadow shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex justify-between items-center p-4 border-b<h2 border-gray-200'>
        <div className='flex flex-col'>
          <h2 className=' font-bold p-2 text-2xl text-primary'>
            Notifications
          </h2>
        </div>
        <IconButton
          className='text-primary'
          onClick={() => onClose && onClose(false)}
        >
          <Close />
        </IconButton>
      </div>
      <div className=' p-2 flex flex-col gap-2 overflow-auto flex-1'>
        {notifications?.length === 0 ? (
          <div className=' flex-1 p-2'>
            {' '}
            <p>you have no notifications yet</p>{' '}
          </div>
        ) : (
          notifications?.map(item => (
            <MyNotification
              key={item?.id}
              {...item}
            />
          ))
        )}
      </div>
      <div className=' flex items-center justify-between text-textSoft italic p-2 mb-2'>
        <p className=' text-sm'>
          {' '}
          &copy; All rights reserved. link up {new Date().getFullYear()}.{' '}
        </p>
      </div>
    </div>
  );
};

export default Notifications;
