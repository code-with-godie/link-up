'use client';
import { Bookmark, BookmarkBorder, Chat, ThumbUp } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import Comments from './Comments';
import { useAppContext } from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { useLikePost, useSavePost } from '@/hooks';
const PostFooter = ({ postID, userID }: { userID: string; postID: string }) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { loading: saving, handleSave } = useSavePost(
    postID,
    () => {},
    user?.$id
  );
  const { loading: liking, handleLike } = useLikePost(postID);
  useEffect(() => {
    if (user?.saved) {
      setBookmarked(user?.saved?.includes(postID));
    }
    if (user?.likedPost) {
      setLiked(user?.likedPost?.includes(postID));
    }
  }, [user, postID]);
  return (
    <div className=' flex flex-col gap-2'>
      {/* ============ user controls start=========================== */}
      <div className=' flex items-center justify-evenly p-2'>
        <button
          disabled={liking}
          className=' flex items-center gap-2'
        >
          {liking ? (
            <div className=' flex items-center gap-4 text-primary'>
              <CircularProgress size={20} />
            </div>
          ) : (
            <>
              <IconButton onClick={handleLike}>
                <ThumbUp className={`${liked && 'text-blue-800'}`} />
              </IconButton>
              <p> {liked ? 'unlike' : 'like'} </p>
            </>
          )}
        </button>
        <div className=' flex items-center gap-2'>
          <IconButton>
            <Chat className={liked ? 'liked' : ''} />
          </IconButton>
          <p>comment</p>
        </div>
        <button
          disabled={saving}
          className=' flex items-center gap-2'
        >
          {saving ? (
            <>
              <div className=' flex items-center gap-4 text-primary'>
                <CircularProgress size={20} />
              </div>
            </>
          ) : (
            <>
              <IconButton onClick={handleSave}>
                {bookmarked ? (
                  <Bookmark className={liked ? 'liked' : ''} />
                ) : (
                  <BookmarkBorder />
                )}
              </IconButton>
              <p> {bookmarked ? 'saved' : 'save'} </p>
            </>
          )}
        </button>
      </div>
      {/* ============ user controls ends=========================== */}

      {/* ============ comment system start start=========================== */}
      <Comments
        userID={userID}
        postID={postID}
      />
    </div>
  );
};

export default PostFooter;
