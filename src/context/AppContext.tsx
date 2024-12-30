'use client';
import { authService } from '@/appWrite/auth';
import { Story, User } from '@/typings/typing';
import { stories as oldStories } from '@/data/index';
import FirstLoading from '@/components/loading/FirstLoading';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { userFormatter } from '@/lib';

interface AppContextType {
  user: User | null;
  stories: Story[];
  showDrawer: boolean;
  showNotifcation: boolean;
  showProfilePic: boolean;
  setProfilePic: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  updateStories: (story: Story) => void;
  updateUser: (user: User | null) => void;
  toggleDrawer: () => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showNotifcation, setShowNotification] = useState<boolean>(false);
  const [stories, setStories] = useState<Story[]>([...oldStories]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showProfilePic, setProfilePic] = useState<boolean>(false);

  const toggleDrawer = () => {
    setShowDrawer(prev => !prev);
  };
  const updateUser = (user: User | null) => {
    setUser(user);
  };
  const updateStories = (story: Story) => {
    setStories(prev => [story, ...prev]);
  };
  const getUser = useCallback(async () => {
    try {
      const session = await authService.getUser();
      if (session) {
        const newUser = userFormatter(session);
        console.log('found user', newUser);

        setUser(newUser);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //    console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const share = {
    user,
    showDrawer,
    updateUser,
    toggleDrawer,
    showNotifcation,
    setShowNotification,
    showProfilePic,
    setProfilePic,
    stories,
    updateStories,
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <AppContext.Provider value={{ ...share }}>
      {' '}
      {loading ? <FirstLoading /> : children}{' '}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
