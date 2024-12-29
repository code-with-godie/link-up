'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppContext } from './AppContext';
import { io, Socket } from 'socket.io-client';
import { INotification } from '@/typings/typing';
import toast from 'react-hot-toast';
interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  notifications: INotification[];
  setSocket: (socket: Socket) => void;
}
type OnlineUser = {
  id: string;
  socketID: string;
};

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);
export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const appContext = useAppContext();
  const user = appContext?.user;
  const sendDetails = useCallback(() => {
    socket?.emit('ADD_USER', user?.$id);
  }, [socket, user]);

  useEffect(() => {
    if (user) {
      const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
      if (socket) {
        setSocket(socket);
        socket.emit('AM_ONLINE', user.$id, user.username);
      }
    } else {
      setSocket(null);
    }
  }, [user]);
  useEffect(() => {
    socket?.on('SEND_DETAILS', sendDetails);

    socket?.on('GET_ONLINE_USERS', onlineUsers => {
      console.log('online users', onlineUsers);
      setOnlineUsers(onlineUsers);
    });
    socket?.on('GET_NOTIFICATIONS', notifications => {
      setNotifications(notifications);
      console.log('notifications', notifications);
    });
    return () => {
      socket?.off('SEND_DETAILS', sendDetails);
    };
  }, [socket, sendDetails]);
  useEffect(() => {
    socket?.on('USER_COME_ONLINE', ({ userID, username }) => {
      if (userID === user?.$id) return;
      const following = user?.followings?.includes(userID);
      const friends = user?.friends?.includes(userID);
      if (following || friends) {
        toast.success(`${username} is now online`);
      }
    });
  }, [socket, user]);
  return (
    <SocketContext.Provider
      value={{ socket, setSocket, notifications, onlineUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
