import React from 'react';
import Share from '../share/Share';
import Feeds from '../feeds/Feeds';
import Introduction from '../introduction/Introduction';
import Friends from '../friends/Friends';

const UserDescription = ({ userID }: { userID: string }) => {
  return (
    <div className='flex justify-center overflow-auto'>
      <div className=' w-full max-w-[1000px] flex flex-col  md:flex-row gap-2 p-2 overflow-auto'>
        <div className='flex flex-1 flex-col gap-2 md:sticky md:top-0'>
          <Introduction userID={userID} />
          <Friends showTitle />
        </div>
        <div className=' flex-1 flex flex-col gap-2'>
          <Share />
          <Feeds
            type='usersPosts'
            userID={userID}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
