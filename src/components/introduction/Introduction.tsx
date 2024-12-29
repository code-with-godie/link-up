'use client';
import { useAppContext } from '@/context/AppContext';
import {
  Edit,
  Favorite,
  LocationOn,
  Phone,
  School,
  Work,
} from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import IntroModel from './IntroModel';
import { User } from '@/typings/typing';
import { authService } from '@/appWrite/auth';
import { userFormatter } from '@/lib';
import { Skeleton } from '@mui/material';

const Introduction = ({
  userID,
  center,
}: {
  userID: string;
  center?: boolean;
}) => {
  const appContext = useAppContext();
  const [showModel, seShowModel] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const loggedInUser = appContext?.user;
  const me = userID === loggedInUser?.$id;
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userID]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return (
      <div className=' bg-white p-2 flex flex-col gap-4 min-h-56'>
        {!center && (
          <h1 className=' font-semibold text-primary text-lg'>Introduction</h1>
        )}
        <Skeleton
          variant='rounded'
          height={50}
          className=' w-full'
        />
        <Skeleton
          variant='rounded'
          height={50}
          className=' w-full'
        />
        <Skeleton
          variant='rounded'
          height={50}
          className=' w-full'
        />
        <Skeleton
          variant='rounded'
          height={50}
          className=' w-full'
        />
        <Skeleton
          variant='rounded'
          height={50}
          className=' w-full'
        />
      </div>
    );
  }
  return (
    <div className={`bg-white p-2 flex flex-col gap-4 ${center && ' pl-6'}`}>
      {!center && (
        <h1 className=' font-semibold text-primary text-lg'>Introduction</h1>
      )}
      {me && (
        <button
          onClick={() => seShowModel(true)}
          className=' bg-primary text-white font-semibold py-2 px-4 w-full cursor-pointer rounded-lg'
        >
          Add Bio
        </button>
      )}
      <div className=' flex gap-4 items-start'>
        <Phone className=' text-gray-500' />
        <div>
          {user?.phone ? (
            <h1 className=' text-black/75'> {user.phone} </h1>
          ) : (
            <>
              <h1 className=' text-black/75'>phone number</h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      <div className=' flex gap-4 items-start'>
        <LocationOn className=' text-gray-500' />
        <div>
          {user?.location ? (
            <h1 className=' text-black/75'>Lives in, {user.location} </h1>
          ) : (
            <>
              <h1 className=' text-lg font-semibold text-black/75'>location</h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      <div className=' flex gap-4 items-start'>
        <Work className=' text-gray-500' />
        <div>
          {user?.work ? (
            <h1 className=' text-black/75'>Works at {user?.work}</h1>
          ) : (
            <>
              <h1 className=' text-lg font-semibold text-black/75'>work</h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      <div className=' flex gap-4 items-start'>
        <School className=' text-gray-500' />
        <div>
          {user?.college ? (
            <h1 className=' text-black/75'>Studied at {user.college}</h1>
          ) : (
            <>
              <h1 className=' text-lg font-semibold text-black/75'>
                College/University
              </h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      <div className=' flex gap-4 items-start'>
        <School className=' text-gray-500' />
        <div>
          {user?.school ? (
            <h1 className=' text-black/75'>Went to {user.school}</h1>
          ) : (
            <>
              <h1 className=' text-lg font-semibold text-black/75'>
                high school
              </h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      <div className=' flex gap-4 items-start'>
        <Favorite className=' text-gray-500' />
        <div>
          {user?.status ? (
            <h1 className=' text-black/75'>{user.status}</h1>
          ) : (
            <>
              <h1 className=' text-lg font-semibold text-black/75'>status</h1>
              <p className=' text-gray-500 text-sm'>not specified</p>
            </>
          )}
        </div>
      </div>
      {me && (
        <button
          onClick={() => seShowModel(true)}
          className=' bg-primary text-white font-semibold py-2 px-4 w-full flex items-center gap-2 justify-center cursor-pointer rounded-lg'
        >
          <Edit />
          Edit details
        </button>
      )}
      {showModel && me && <IntroModel seShowModel={seShowModel} />}
    </div>
  );
};

export default Introduction;
