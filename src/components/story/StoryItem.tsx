import Image from 'next/image';
import VideoStory from './VideoStory';
import { Story } from '@/typings/typing';
import PostAvatar from '../post/PostAvatar';
const StoryItem = ({ url, type, text, bg, user, expiresAt }: Story) => {
  //   const videoRef = useRef();
  //   const togglePlay = e => {
  //     videoRef.current?.paused
  //       ? videoRef.current.play()
  //       : videoRef.current.pause();
  //   };
  if (type === 'text') {
    return (
      <div
        className=' shrink-0 w-[110px] p-2 flex justify-center items-center md:w-[130px] h-full rounded-lg relative'
        style={{ background: `${bg}` }}
      >
        <p className=' text-white font-semibold text-lg  center'> {text} </p>
        <div className=' absolute z-10 top-1 left-1 '>
          <PostAvatar
            userID={user.$id}
            username={user.username}
            profilePic={user.profilePic}
          />
        </div>
      </div>
    );
  }
  if (type === 'video' && url) {
    return (
      <VideoStory
        expiresAt={expiresAt}
        user={user}
        type={type}
        url={url}
      />
    );
  }
  if (!url) return;
  return (
    <div className=' shrink-0 relative '>
      <div className=' relative w-[100px] md:w-[120px] h-full'>
        <Image
          alt='story'
          src={url}
          fill
          // width={100}
          className=' rounded-lg object-cover'
          // height={150}
        />
      </div>
      <Image
        src={user?.profilePic || '/cover.png'}
        width={40}
        height={40}
        alt='story picture'
        className=' absolute z-10 top-1 left-1 rounded-full border-gray-50 border'
      />
    </div>
  );
};

export default StoryItem;
