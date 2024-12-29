import { Models } from 'appwrite';
import { MutableRefObject } from 'react';

export type appwriteConfiguration = {
  appWriteEndPoint: string;
  appWriteProject: string;
  appWriteBucket: string;
  appWriteDatabase: string;
  appWritePostsCollectionID: string;
  appWriteUsersCollectionID: string;
  appWriteMessegesCollectionID: string;
  appWriteRoomsCollectionID: string;
  appWriteStoriesCollectionID: string;
  appWriteCommentsCollectionID: string;
};
export type User = {
  username: string;
  email: string;
  profilePic: string;
  coverPic?: string;
  $id: string;
  accountId: string;
  location?: string;
  status?: 'married' | 'engaged' | 'dating' | 'single';
  college?: string;
  school?: string;
  phone?: string;
  work?: string;
  bio?: string;
  showBio: boolean;
  role: 'normal' | 'admin';
  likes?: string[];
  followers?: string[];
  friends?: string[];
  followings?: string[];
  blockedUsers?: string[];
  friendRequest?: string[];
  saved?: string[];
  likedPost?: string[];
  showonBoarding?: boolean;
};
export interface Post extends Models.Document {
  caption: string;
  url: string;
  text: string;
  bg: string;
  user: User;
  postType: 'text' | 'image' | 'video';
  likes: string[];
  bookmarks?: string[];
  shares?: string[];
  imageID?: string;
  observer?: IntersectionObserver | null | undefined;
}
export interface IComment extends Models.Document {
  user: User;
  title: string;
  postID: string;
  type: 'text' | 'image' | 'video';
}

export interface ITextPost extends IMypost {
  text: string;
  bg: string;
  // user: User;
  // postType: 'text';
}
export interface IMediaPost extends IMypost {
  caption: string;
}

interface IMypost {
  postType: string;
  user: string | undefined;
}
interface IFollowings {
  $id: string;
  profilePic: string;
  username: string;
}
export type Conversation = {
  receiverID: string;
  roomID: string;
  profilePic: string | undefined;
  username: string | undefined;
};
export type Room = {
  members: string[];
  $id: string;
  setConversation?: (value: Conversation) => void;
  last_message: string;
};
export interface ISms {
  title: string;
  receiver: string;
  sender: string;
  room: string;
}
export interface IMessage {
  title: string;
  receiver: User;
  sender: User;
  $id: string;
  deletedBy: string[];
  room: Room;
  $createdAt: string;
  messegeRef?: MutableRefObject<HTMLDivElement | null>;
}
interface INotification {
  type: { target: string; type: string; ALLOW_DUPLICATE: boolean };
  postID?: string;
  senderID: string;
  receiverID: string;
  username: string;
  messege: string;
  id: string;
  read: boolean;
  createAt: Date;
}
type Story = {
  url?: string;
  imageID?: string;
  user: User;
  type: 'image' | 'video' | 'text';
  text?: string;
  bg?: string;
  expiresAt: Date;
};

export type MiniUser = {
  username: string;
  profilePic: string;
  coverPic?: string;
  $id: string;
  likes?: string[];
  followers?: string[];
  friends?: string[];
  friendRequest?: string[];
};
