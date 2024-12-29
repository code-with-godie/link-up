'use client';
import { Close, EmojiEmotionsOutlined } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import TextPost from './TextPost';
import { useAppContext } from '@/context/AppContext';
import { appwriteService } from '@/appWrite/appwriteService';
import { IMediaPost, ITextPost } from '@/typings/typing';
import FileViewer from './FileViewer';
// import { revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';
import CustomEmojiPicker from '../emojiPicker/CustomEmojiPicker';
// import { revalidatePath } from 'next/cache';

const NewPost = ({
  close,
  home,
}: {
  home?: boolean;
  close: (value: boolean) => void;
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [type, setType] = useState<string>('image');
  const [text, setText] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string>('white');
  const appContext = useAppContext();
  const router = useRouter();
  const user = appContext?.user;
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setText(prev => prev + emojiObject.emoji);
    setShowPicker(false);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };
  const handlePost = async () => {
    try {
      setPosting(true);
      let post: ITextPost | IMediaPost | null = null;
      switch (type) {
        case 'text':
          post = {
            text,
            bg: color,
            postType: type,
            user: user?.$id,
          };
          break;
        default:
          post = { postType: type, user: user?.$id, caption: text };
      }
      await appwriteService.createPost(post, file);
      // revalidatePath('/');
      ///use chatgpt to know to to revaliate path or tag
      // revalidateTag('feeds');
      if (home) {
        router.replace('/');
      }
      close(false);
    } catch (error) {
      console.log(error);
    } finally {
      setPosting(false);
    }
  };
  return (
    <div className=' w-screen max-w-[500px] p-4 bg-white rounded-lg flex  flex-col gap-2 '>
      <div className='flex items-center'>
        <h1 className=' flex-1 text-center font-semibold text-lg'>
          create post
        </h1>
        <IconButton onClick={() => close(false)}>
          <Close />
        </IconButton>
      </div>
      <div className='flex items-center gap-2'>
        <Image
          alt='profile'
          width={50}
          height={50}
          src={user ? user?.profilePic : 'cover.png'}
          className=' rounded-full'
        />
        <div className='flex items-start gap-2 flex-col'>
          <h1 className=' font-semibold capitalize '> {user?.username} </h1>
        </div>
      </div>
      {type === 'text' ? (
        <TextPost
          text={text}
          onEmojiClick={onEmojiClick}
          setText={setText}
          setColor={setColor}
          color={color}
        />
      ) : (
        <form
          onSubmit={e => e.preventDefault()}
          className=' px-2 flex items-center rounded-2xl flex-1 relative'
        >
          <input
            placeholder={`what is on your mind ${user?.username} ?...`}
            className=' border-none bg-transparent outline-none flex-1 placeholder:text-gray-600 '
            onFocus={() => setShowPicker(false)}
            value={text}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setText(e.target.value)}
          />
          <IconButton
            className='btn'
            onClick={() => setShowPicker(prev => !prev)}
          >
            <EmojiEmotionsOutlined className=' text-primary text-2xl' />
          </IconButton>
          {showPicker && <CustomEmojiPicker onEmojiClick={onEmojiClick} />}
        </form>
      )}

      {type === 'image' && file ? (
        <FileViewer
          setType={setType}
          file={file}
        />
      ) : (
        type === 'image' &&
        !file && (
          <div className='w-full h-40 border border-gray-300 p-2 rounded-lg'>
            <div className=' group size-full bg-gray-100 rounded-lg flex flex-col p-1 hover:bg-gray-50 cursor-pointer'>
              <div
                className=' bg-white border rounded-full p-2 group-hover:bg-gray-300 group-hover:text-white self-end'
                onClick={() => setType('text')}
              >
                <Close />
              </div>
              <label
                htmlFor='file'
                className='flex-1 grid place-content-center cursor-pointer'
              >
                <h1 className=' font-semibold'>Add photo or video</h1>
                <h1 className=' text-sm text-gray-400'>or drag and drop</h1>
                <input
                  type='file'
                  hidden
                  onChange={handleFile}
                  id='file'
                />
              </label>
            </div>
          </div>
        )
      )}
      <div className=' border border-gray-400 rounded-lg p-4 flex justify-between'>
        <h1 className=' font-semibold'>add to your post</h1>

        <div className=' flex gap-1 items-center'>
          <EmojiEmotionsOutlined />
          <EmojiEmotionsOutlined />
        </div>
      </div>
      <button
        className=' p-3 flex-1 rounded-lg bg-primary cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 text-white disabled:text-gray-600'
        onClick={handlePost}
      >
        {posting ? <CircularProgress size={30} /> : 'post'}
      </button>
    </div>
  );
};

export default NewPost;
