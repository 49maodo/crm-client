import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-bold mb-4'>Client non trouvé</h2>
      <p className='text-muted-foreground mb-6'>Le client que vous recherchez n&apos;existe pas ou a été supprimé.</p>
      <Link href='/clients'>
        <Button>Retour à la liste des clients</Button>
      </Link>
    </div>
  );
}
