import React from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import { Post as IPost } from '@/typings/typing';

const Post = ({
  user: { username, profilePic, $id },
  $createdAt,
  postType,
  url,
  text,
  caption,
  bg,
  $id: postID,
  observer,
}: IPost) => {
  return (
    <div className=' bg-white w-full p-2'>
      <PostHeader
        username={username}
        date={$createdAt}
        postID={postID}
        userID={$id}
        profilePic={profilePic}
        caption={caption}
      />
      <PostContent
        text={text}
        observer={observer}
        bg={bg}
        type={postType}
        url={url}
      />
      <PostFooter
        userID={$id}
        postID={postID}
      />
    </div>
  );
};

export default Post;
