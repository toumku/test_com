'use client';

import * as React from 'react';
import { IdCardLanyard, MonitorSmartphone } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Хэрэглэгч',
      url: '/users',
      icon: IdCardLanyard,
    },
    {
      title: 'Бие бүрэлдэхүүн',
      url: '/employees',
      icon: IdCardLanyard,
    },
    {
      title: 'Төхөөрөмж',
      url: '/devices',
      icon: MonitorSmartphone,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
