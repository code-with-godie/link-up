import Messeger from '@/components/inbox/Messeger';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'inbox',
  description: 'interact with people on link up',
};
const Inbox = () => {
  return <Messeger />;
};

export default Inbox;
