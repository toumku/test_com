import { NavUser } from '@/components/nav-user';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ReactNode } from 'react';

export type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout(props: ProtectedLayoutProps) {
  const { children } = props;

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className='flex h-16  items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between'>
          <Tabs defaultValue='account' className='w-[400px] mx-4'>
            <TabsList>
              <TabsTrigger value='home' asChild>
                <Link href='/'>Эхлэл</Link>
              </TabsTrigger>
              <TabsTrigger value='users' asChild>
                <Link href='/users'>Хэрэглэгч</Link>
              </TabsTrigger>
              <TabsTrigger value='employees' asChild>
                <Link href='/employees'>Бие бүрэлдэхүүн</Link>
              </TabsTrigger>
              <TabsTrigger value='devices' asChild>
                <Link href='/devices'>Төхөөрөмж</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='min-w-40'>
            <NavUser />
          </div>
        </header>

        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
