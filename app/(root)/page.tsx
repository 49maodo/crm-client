import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='bg-background text-foreground'>
      <ModeToggle />
      <Button className='bg-primary text-primary-foreground'>Click me 1</Button>
    </div>
  );
}
