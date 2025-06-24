'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Users, LayoutDashboard, UserPlus, LogOut, Settings, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ModeToggle } from './toggle-theme';
import { useAppSelector } from '@/lib/hooks';
import { logoutUser } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';

interface NavbarLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Nouveau client', href: '/clients/nouveau', icon: UserPlus },
];

export function NavbarLayout({ children }: NavbarLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    // logout();
    await dispatch(logoutUser());
    router.push('/login');
  };

  return (
    <div className='min-h-screen'>
      {/* Navbar */}
      <nav className='shadow-sm border-b bg-background  sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            {/* Logo et navigation principale */}
            <div className='flex items-center'>
              <div className='flex items-center gap-3 mr-8'>
                <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                  <Users className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold'>CRM</span>
              </div>

              {/* Navigation desktop */}
              <div className='hidden md:flex space-x-1'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button key={item.name} variant={isActive ? 'default' : 'ghost'} className={`flex items-center gap-2 ${isActive ? 'bg-primary text-accent-foreground hover:primary/90' : ''}`} onClick={() => router.push(item.href)}>
                      <item.icon className='w-4 h-4' />
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Actions utilisateur */}
            <div className='flex items-center gap-4'>
              <ModeToggle />
              <Button variant='ghost' size='sm' className='hidden sm:flex'>
                <Bell className='w-5 h-5' />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='flex items-center gap-3'>
                    <Avatar className='w-8 h-8'>
                      <AvatarFallback className='bg-primary text-sm'>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className='hidden sm:block text-sm font-medium'>{user?.name || 'Utilisateur'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-xs '>{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className='w-4 h-4 mr-2' />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className='text-red-600'>
                    <LogOut className='w-4 h-4 mr-2' />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Menu mobile */}
              <Button variant='ghost' size='sm' className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-background'>
            <div className='px-4 py-3 space-y-1'>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.name}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 
                      ${isActive ? 'bg-primary text-accent-foreground hover:bg-primary/90' : ''}`}
                    onClick={() => {
                      router.push(item.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className='w-4 h-4' />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Contenu principal */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>{children}</main>
    </div>
  );
}
