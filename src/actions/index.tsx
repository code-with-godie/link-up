'use server';

import { appwriteService } from '@/appWrite/appwriteService';
import { revalidatePath } from 'next/cache';

export const deletePost = async (postID: string) => {
  await appwriteService.handleDelete(postID);
  revalidatePath('/');
  return true;
};
export const blockUser = async (userID: string, blockID: string) => {
  const res = await appwriteService.blockUser(userID, blockID);
  revalidatePath('/');
  return res;
};
export const savePost = async (postID: string, userID: string) => {
  const res = await appwriteService.savePost(postID, userID);
  return res;
};
export const likePost = async (postID: string, userID: string) => {
  const res = await appwriteService.likePost(postID, userID);
  return res;
};
