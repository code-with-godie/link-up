import { IComment, IMessage, MiniUser, Post, User } from '@/typings/typing';
import { Models } from 'appwrite';

export const generateColors = () => {
  const colors = [];
  let index1 = 0;
  let index2 = 0;
  while (index1 < 8) {
    colors.push(generateGradientBackground());
    index1++;
  }
  while (index2 < 5) {
    colors.push(getRandomColor());
    index2++;
  }
  return colors;
};
function generateGradientBackground() {
  const gradientType = getRandomInt(0, 1) ? 'linear' : 'radial';
  const direction =
    gradientType === 'linear' ? `${getRandomInt(0, 360)}deg` : 'circle';
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  const gradientBackground = `${gradientType}-gradient(${direction}, ${color1}, ${color2}, ${color3})`;
  return gradientBackground;
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const userFormatter = (user: Models.Document) => {
  const newUser: User = {
    $id: user.$id,
    email: user?.email,
    accountId: user?.accountId,
    username: user?.username,
    role: user?.role,
    profilePic: user?.profilePic,
    coverPic: user?.coverPic,
    blockedUsers: user?.blockedUsers,
    friendRequest: user?.friendRequest,
    friends: user?.friends,
    saved: user?.saved,
    followers: user?.followers,
    followings: user?.followings,
    likes: user?.likes,
    bio: user?.bio,
    location: user?.location,
    likedPost: user?.likedPost,
    status: user?.status,
    college: user?.college,
    school: user?.school,
    phone: user?.phone,
    work: user?.work,
    showBio: user?.showBio,
    showonBoarding: user?.showonBoarding,
  };
  return newUser;
};
export const postFormatter = (posts: Models.Document[]) => {
  const newPosts: Post[] = posts.map((doc: Models.Document) => ({
    caption: doc?.caption,
    user: doc?.user,
    text: doc?.text,
    bg: doc?.bg,
    postType: doc?.postType,
    url: doc?.url,
    $id: doc.$id,
    $collectionId: doc.$collectionId,
    $createdAt: doc.$createdAt,
    $databaseId: doc.$databaseId,
    $permissions: doc.$permissions,
    $updatedAt: doc.$updatedAt,
    likes: doc.likes,
  }));
  return newPosts;
};
export const miniUsersFormatter = (users: Models.Document[]) => {
  const newUsers: MiniUser[] = users.map((doc: Models.Document) => ({
    username: doc?.username,
    profilePic: doc?.profilePic,
    coverPic: doc?.coverPic,
    likes: doc.likes,
    followers: doc.followers,
    $id: doc.$id,
    friends: doc.friends,
    friendRequest: doc.friendRequest,
  }));
  return newUsers;
};
export const commentsFormatter = (res: Models.Document[]) => {
  const comments: IComment[] = res.map((doc: Models.Document) => ({
    title: doc?.title,
    postID: doc?.postID,
    user: doc?.user,
    type: doc?.type,
    $id: doc.$id,
    $collectionId: doc?.$collectionId,
    $createdAt: doc?.$createdAt,
    $databaseId: doc?.$databaseId,
    $permissions: doc?.$permissions,
    $updatedAt: doc?.$updatedAt,
  }));
  return comments;
};
export const messegesFormatter = (res: Models.Document[]) => {
  const messeges: IMessage[] = res.map((doc: Models.Document) => ({
    title: doc?.title,
    receiver: doc?.receiver,
    sender: doc?.sender,
    $id: doc?.$id,
    deletedBy: doc?.deletedBy,
    room: doc?.room,
    $createdAt: doc?.$createdAt,
  }));
  return messeges;
};
export const commentFormatter = (res: Models.Document) => {
  const comment: IComment = {
    title: res?.title,
    postID: res?.postID,
    user: res?.user,
    type: res?.type,
    $id: res.$id,
    $collectionId: res?.$collectionId,
    $createdAt: res?.$createdAt,
    $databaseId: res?.$databaseId,
    $permissions: res?.$permissions,
    $updatedAt: res?.$updatedAt,
  };
  return comment;
};
