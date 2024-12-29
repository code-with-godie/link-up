import Image from 'next/image';

export const FirstLoading = () => {
  return (
    <div className=' w-screen h-screen grid place-content-center'>
      {' '}
      <Image
        alt='logo'
        src='/logo.png'
        width={200}
        height={200}
        className=' animate-pulse'
      />
    </div>
  );
};
export default FirstLoading;
