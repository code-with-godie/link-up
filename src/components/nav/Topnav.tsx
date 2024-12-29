import React from 'react';
import LinksContainer from '@/components/nav/LinksContainer';
import LogoContainer from '@/components/nav/LogoContainer';
import UserControl from '@/components/nav/UserControl';

const Topnav = () => {
  return (
    <div className='hidden md:flex  my-shadow border-b-2 border-gray-100'>
      <LogoContainer />
      <LinksContainer />
      <UserControl />
    </div>
  );
};

export default Topnav;
