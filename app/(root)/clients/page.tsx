'use client';
import { ClientDataTable } from '@/components/client-data-table';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ClientsPage() {
  const { clients } = useAppSelector((state) => state.clients);

  return (
    <ProtectedRoute>
      <div className='space-y-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold'>Gestion des Clients</h1>
          <p className='text-muted-foreground'>Gérez vos clients avec recherche, filtres et pagination</p>
        </div>
        <ClientDataTable data={clients} />
      </div>
    </ProtectedRoute>
  );
}
