import Topnav from '@/components/nav/Topnav';
import Mobilenav from '@/components/nav/Mobilenav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=' overflow-auto h-screen flex flex-col '>
      <Topnav />
      <Mobilenav />
      {children}
    </section>
  );
}
