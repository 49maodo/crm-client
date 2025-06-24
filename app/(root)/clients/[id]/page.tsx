'use client';
import { notFound } from 'next/navigation';
import { ClientDetailPage } from './client-detail-view';
import { useAppSelector } from '@/lib/hooks';
import { use } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const { clients } = useAppSelector((state) => state.clients);
  const client = clients.find((client) => client.id === id);

  if (!client) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <ClientDetailPage client={client} />
    </ProtectedRoute>
  );
}
