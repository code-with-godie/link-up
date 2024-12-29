import { blockUser, deletePost, likePost, savePost } from '@/actions';
import { useAppContext } from '@/context/AppContext';
import { userFormatter } from '@/lib';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useDeletePost = (postID: string, callback: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost(postID);
      //   await appwriteService.handleDelete(postID);
      toast.success('post successfully deleted');
      callback();
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Faild to delete post 😩😩');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDelete };
};
export const useSavePost = (
  postID: string,
  callback: () => void,
  userID?: string
) => {
  const appContext = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSave = async () => {
    try {
      setLoading(true);
      if (!userID) {
        return toast.error('useID required');
      }
      const res = await savePost(postID, userID);
      if (res?.saved) {
        toast.success('post successfully saved');
      } else {
        toast.success('post successfully unsaved');
      }
      if (!res?.newUser) {
        return toast.error('did not get a new user back');
      }
      const user = userFormatter(res?.newUser);
      appContext?.updateUser(user);
      callback();
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Faild to delete post 😩😩');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSave };
};
export const useLikePost = (postID: string) => {
  const appContext = useAppContext();
  const loggedInUser = appContext?.user;
  const [loading, setLoading] = useState<boolean>(false);
  const handleLike = async () => {
    try {
      setLoading(true);
      if (!loggedInUser) {
        return toast.error('you need to be logged In');
      }
      const res = await likePost(postID, loggedInUser.$id);
      if (res?.liked) {
        toast.success('post successfully liked');
      } else {
        toast.success('post successfully unliked');
      }
      if (!res?.user) {
        return toast.error('did not get a new user back');
      }
      appContext?.updateUser(res.user);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Faild to delete post 😩😩');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleLike };
};
export const useBlockUser = (
  callback: () => void,
  blockID: string,
  userID?: string
) => {
  const appContext = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBlock = async () => {
    try {
      setLoading(true);
      if (!userID) {
        return toast.error('userID requires');
        // throw new Error('userID required');
      }
      const res = await blockUser(userID, blockID);
      if (res?.blocked) {
        toast.success('user successfully blocked');
      } else {
        toast.success('user successfully unblocked');
      }
      appContext?.updateUser(res?.user);
      callback();
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Faild to delete post 😩😩');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleBlock };
};
