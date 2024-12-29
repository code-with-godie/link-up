'use client';
import React from 'react';
import { useAppContext } from './AppContext';
import { useRouter } from 'next/navigation';

const ProtectionProvider = ({ children }: { children: React.ReactNode }) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const router = useRouter();
  if (!user) {
    router.push('/sign-in');
  }
  return <> {children} </>;
};

export default ProtectionProvider;
