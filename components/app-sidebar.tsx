'use client';
import { LayoutDashboard, UserPlus, Users } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ModeToggle } from './toggle-theme';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clients',
    url: '/clients',
    icon: Users,
  },
  {
    title: 'Nouveau client',
    url: '/clients/nouveau',
    icon: UserPlus,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button
                      key={item.title}
                      variant={pathname === item.url ? 'default' : 'outline'}
                      className={`
                   ${pathname === item.url ? 'bg-primary text-accent-foreground hover:bg-primary/90' : ''}`}
                      asChild
                    >
                      <Link href={item.url} className='flex items-center justify-around gap-2'>
                        <item.icon className='w-4 h-4' />
                        {item.title}
                      </Link>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='flex items-end justify-between p-4'>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
