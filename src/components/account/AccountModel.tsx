'use client';
import { authService } from '@/appWrite/auth';
import { useAppContext } from '@/context/AppContext';
import {
  Help,
  Info,
  KeyboardArrowRight,
  Logout,
  Settings,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaMoon } from 'react-icons/fa';

const AccountModel = () => {
  const appContext = useAppContext();
  const setUser = appContext?.updateUser;
  const isOpen = appContext?.showProfilePic;
  const setIsOpen = appContext?.setProfilePic;
  const router = useRouter();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    authService.logout().then(() => {
      if (setUser) {
        setUser(null);
      }
      if (setIsOpen) {
        setIsOpen(false);
      }
    });
  };
  return (
    <div
      onClick={() => setIsOpen && setIsOpen(false)}
      className={`hidden fixed top-16 right-2 h-max w-full max-w-[350px] bg-gray-400 my-shadow shadow-lg z-50 transform transition-transform duration-300 ease-in-out divide-y-2 md:flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-[110%]'
      }`}
    >
      <div
        onClick={() => router.push(`/profile/${appContext?.user?.$id}`)}
        className=' flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 overflow-auto'
      >
        <Avatar
          src={appContext?.user?.profilePic}
          alt={appContext?.user?.username}
        />
        <p className=''>{appContext?.user?.username}</p>
      </div>
      <div className=' flex gap-2 items-center p-4 hover:bg-gray-50 cursor-pointer'>
        <div className=' flex gap-2 items-center flex-1'>
          <Settings />
          <p className=''>settings and privacy</p>
        </div>
        <KeyboardArrowRight />
      </div>
      <div className=' flex gap-2 items-center p-4 hover:bg-gray-50 cursor-pointer'>
        <div className=' flex gap-2 items-center flex-1'>
          <Help />
          <p className=''>help and support</p>
        </div>
        <KeyboardArrowRight />
      </div>
      <div className=' flex gap-2 items-center p-4 hover:bg-gray-50 cursor-pointer'>
        <div className=' flex gap-2 items-center flex-1'>
          <FaMoon />
          <p className=''>display and accessibilty</p>
        </div>
        <KeyboardArrowRight />
      </div>
      <div className=' flex gap-2 items-center p-4 hover:bg-gray-50 cursor-pointer'>
        <div className=' flex gap-2 items-center flex-1'>
          <Info />
          <p className=''>give feedback</p>
        </div>
        <KeyboardArrowRight />
      </div>
      <div
        onClick={handleLogout}
        className=' flex gap-2 items-center p-4 hover:bg-gray-50 cursor-pointer'
      >
        <div className=' flex gap-2 items-center flex-1'>
          <Logout />
          <p className=''>Logout</p>
        </div>
        <KeyboardArrowRight />
      </div>
    </div>
  );
};

export default AccountModel;
