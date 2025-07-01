'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { signOut, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export function NavUser() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <div>...</div>;
  }

  if (!data) {
    redirect('/auth/sign-in');
  }

  function onSignOut() {
    signOut({
      fetchOptions: {
        onError: ctx => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          redirect('/auth/sign-in');
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarFallback className='rounded-lg'>
              {data.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{data.user.name}</span>
            <span className='truncate text-xs'>
              {data.user.role || data.user.email}
            </span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
        side={'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut />
          Системээс гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
