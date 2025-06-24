import { NavbarLayout } from '@/components/app-navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
    <NavbarLayout>{children}</NavbarLayout>
    
  );
}
