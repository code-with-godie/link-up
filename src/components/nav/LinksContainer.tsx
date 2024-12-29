'use client';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LinksContainer = () => {
  const pathname = usePathname();

  // Define a function to check if the link is active
  const isActive = (path: string) => pathname === path;
  return (
    <div className='flex justify-center gap-2 flex-1 items-center px-6'>
      <Tooltip
        arrow
        title='Home'
      >
        <Link
          href='/'
          className={`${isActive('/') && ' border-b-2 border-b-primary'}`}
        >
          <div className='flex items-center gap-2'>
            <IconButton className={`${isActive('/') ? 'text-blue-500' : ''}`}>
              <HomeIcon className={`${isActive('/') && 'text-primary'}`} />
            </IconButton>
          </div>
        </Link>
      </Tooltip>
      <Tooltip
        arrow
        title='Friends'
      >
        <Link
          href='/friends'
          className={`${
            isActive('/friends') && ' border-b-2 border-b-primary'
          }`}
        >
          <div className='flex items-center gap-2'>
            <IconButton
              className={`${isActive('/friends') ? 'text-blue-500' : ''}`}
            >
              <PeopleAltOutlinedIcon
                className={`${isActive('/friends') && 'text-primary'}`}
              />
            </IconButton>
          </div>
        </Link>
      </Tooltip>
      <Tooltip
        arrow
        title='Videos'
      >
        <Link
          href='/watch'
          className={`${isActive('/watch') && ' border-b-2 border-b-primary'}`}
        >
          <div className='flex items-center gap-2'>
            <IconButton
              className={`${isActive('/watch') ? 'text-blue-500' : ''}`}
            >
              <OndemandVideoIcon
                className={`${isActive('/watch') && 'text-primary'}`}
              />
            </IconButton>
          </div>
        </Link>
      </Tooltip>
      <Tooltip
        arrow
        title='Games'
      >
        <Link
          href='/games'
          className={`${isActive('/games') && ' border-b-2 border-b-primary'}`}
        >
          <div className='flex items-center gap-2'>
            <IconButton
              className={`${isActive('/games') ? 'text-blue-500' : ''}`}
            >
              <VideogameAssetIcon
                className={`${isActive('/games') && 'text-primary'}`}
              />
            </IconButton>
          </div>
        </Link>
      </Tooltip>
    </div>
  );
};

export default LinksContainer;
