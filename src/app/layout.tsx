import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import { SocketContextProvider } from '@/context/SocketContext';
import ProtectionProvider from '@/context/ProtectionProvider';
import { Toaster } from 'react-hot-toast';
export const revalidate = 10;
export const metadata: Metadata = {
  title: 'link up',
  description: 'connect with friends and people all over the world',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className=' w-screen flex justify-center'>
          <section className=' bg-soft w-full max-w-[1500px]  overflow-auto'>
            <AppContextProvider>
              <ProtectionProvider>
                <SocketContextProvider>{children}</SocketContextProvider>
              </ProtectionProvider>
            </AppContextProvider>
            <Toaster />
          </section>
        </main>
      </body>
    </html>
  );
}
