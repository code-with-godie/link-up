// import { authService } from '@/appWrite/auth';
import { appwriteService } from '@/appWrite/appwriteService';
import UserDescription from '@/components/profile/UserDescription';
import UserDetails from '@/components/profile/UserDetails';
import UserDetailsSkeleton from '@/components/skeleton/UserDetailsSkeleton';
import { Suspense } from 'react';

// Define the type for the params
interface ProfileParams {
  params: { id: string };
}
export const generateMetadata = async ({ params: { id } }: ProfileParams) => {
  const user = await appwriteService.getUserById(id);
  if (!user) {
    return {
      title: '404 user not found',
      description: 'user not found',
    };
  }
  return {
    title: `@${user.username} page`,
    description: `this page belongs to ${user?.username}`,
    icons: {
      icon: `${user?.profilePic}`,
    },
  };
};
export const generateStaticParams = async () => {
  const users = await appwriteService.getAllUsers();
  return users.map(item => ({ id: item.$id }));
};
function Profile({ params: { id } }: ProfileParams) {
  return (
    <div className='overflow-auto'>
      <Suspense fallback={<UserDetailsSkeleton />}>
        <UserDetails userID={id} />
      </Suspense>
      <UserDescription userID={id} />
    </div>
  );
}

export default Profile;
