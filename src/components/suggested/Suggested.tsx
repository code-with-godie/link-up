'use client';
import React, { useCallback, useEffect, useState } from 'react';
import SuggestedAccount from './SuggestedAccount';
import { miniUsersFormatter } from '@/lib';
import { appwriteService } from '@/appWrite/appwriteService';
import { Models } from 'appwrite';
import { MiniUser } from '@/typings/typing';
import { useAppContext } from '@/context/AppContext';
import SuggestedAccountSkelton from '../skeleton/SuggestedAccountSkelton';

const Suggested = () => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const [loading, setLoading] = useState(true);
  const [suggestedAccounts, setSuggestedAccounts] = useState<MiniUser[]>([]);
  const getPeople = useCallback(async () => {
    try {
      if (!user) return;
      setLoading(true);
      const res: Models.Document[] = await appwriteService.getUsers(user?.$id);
      const friends = miniUsersFormatter(res);
      setSuggestedAccounts(friends);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  if (loading) {
    return (
      <div className=' flex flex-col gap-2 mt-4'>
        <h1 className=' text-gray-700 font-semibold text-lg'>
          Suggested Accounts
        </h1>
        <SuggestedAccountSkelton />
      </div>
    );
  }
  return (
    <div className=' flex flex-col gap-2 overflow-auto mt-4 mb-4 '>
      <h1 className=' text-gray-700 font-semibold text-lg'>
        Suggested Accounts
      </h1>
      {suggestedAccounts?.map(item => (
        <SuggestedAccount
          key={item.$id}
          {...item}
        />
      ))}
    </div>
  );
};

export default Suggested;
