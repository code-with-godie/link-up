import Birthday from '@/components/birthday/Birthday';
import Leftbar from '@/components/nav/Sidenav';
import Suggested from '@/components/suggested/Suggested';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'link up',
  description: 'connect with friends and people all over the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-full overflow-auto flex-col'>
      <article className='flex flex-1  overflow-auto'>
        <div className=' hidden md:block w-1/4 min-w-[300px] overflow-auto'>
          <Leftbar />
        </div>
        <div className='w-full lg:w-2/4 overflow-auto'>{children}</div>
        <div className='hidden lg:block w-1/4 overflow-auto p-2'>
          <Birthday />
          <Suggested />
        </div>
      </article>
    </section>
  );
}
