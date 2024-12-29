import React from 'react';
import Comment from './Comment';
import { IComment } from '@/typings/typing';
const CommentsList = ({ comments }: { comments: IComment[] }) => {
  return (
    <div className=' flex flex-col gap-2 p-2'>
      {comments.map(item => (
        <Comment
          key={item?.$id}
          {...item}
        />
      ))}
    </div>
  );
};

export default CommentsList;
