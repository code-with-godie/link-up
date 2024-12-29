import { appwriteConfiguration } from '@/typings/typing';
//live configs
// export const appwriteConfig: appwriteConfiguration = {
//   appWriteEndPoint: 'https://cloud.appwrite.io/v1',
//   appWriteProject: '66ec158e0028c15d7ff9',
//   appWriteBucket: '66ec1749003306f626fa',
//   appWriteDatabase: '66ec16e3003977d00cab',
//   appWriteProductCollectionID: '66ec17660019fd49a901',
//   appWriteUsersCollectionID: '66ec1776000b088d1dc9',
//   appWriteCategoryCollectionID: '66ec17890000d4ff8afe',
// };

export const appwriteConfig: appwriteConfiguration = {
  appWriteEndPoint: String(process.env.NEXT_PUBLIC_APPWRITE_END_POINT),
  appWriteProject: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
  appWriteBucket: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET),
  appWriteDatabase: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE),
  appWritePostsCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID
  ),
  appWriteUsersCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
  ),
  appWriteCommentsCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID
  ),
  appWriteRoomsCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID
  ),
  appWriteMessegesCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_MESSEGES_COLLECTION_ID
  ),
  appWriteStoriesCollectionID: String(
    process.env.NEXT_PUBLIC_APPWRITE_STORIES_COLLECTION_ID
  ),
};
