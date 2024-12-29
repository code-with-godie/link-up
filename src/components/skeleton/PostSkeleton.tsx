import { Skeleton } from '@mui/material';

const PostsSkeleton = ({ counter = 10 }: { counter?: number }) => {
  return (
    <div className=' w-full flex flex-col gap-2'>
      {Array(counter).fill(
        <Skeleton
          key={Math.random()}
          variant='rounded'
          height='400px'
          width='100%'
        />
      )}
    </div>
  );
};

export default PostsSkeleton;
