'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, UserPlus, Calendar, ArrowRight, Building, Users } from 'lucide-react';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAppSelector } from '@/lib/hooks';

export default function Dashbord() {
  const { clients, stats } = useAppSelector((state) => state.clients);
  const recentClients = [...clients]
    .filter((c) => c.dateCreation)
    .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
    .slice(0, 3);
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div className='space-y-8'>
        {/* Section d'accueil */}
        <div className='bg-gradient-to-r from-primary to-blue-700 rounded-xl p-8 text-foreground'>
          <h1 className='text-3xl font-bold mb-2'>Tableau de bord</h1>
          <p className='text-foreground/80 text-lg'>Bienvenue sur votre CRM. Voici un aperçu de votre activité.</p>
        </div>

        {/* Cartes de statistiques */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Clients</CardTitle>
              <Users className='h-5 w-5 text-blue-600' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold '>{stats.totalClients}</div>
              <p className='text-xs text-green-600 flex items-center gap-1 mt-2'>
                <TrendingUp className='w-3 h-3' />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Clients Actifs</CardTitle>
              <Users className='h-5 w-5 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>{stats.clientsActifs}</div>
              <p className='text-xs text-green-600 flex items-center gap-1 mt-2'>
                <TrendingUp className='w-3 h-3' />
                +8% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium '>Prospects</CardTitle>
              <UserPlus className='h-5 w-5 text-orange-600' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold '>{stats.prospects}</div>
              <p className='text-xs text-green-600 flex items-center gap-1 mt-2'>
                <TrendingUp className='w-3 h-3' />
                +5% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium '>Activités</CardTitle>
              <Calendar className='h-5 w-5 text-purple-600' />
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold '>{stats.activitesRecentes}</div>
              <p className='text-xs text-green-600 flex items-center gap-1 mt-2'>
                <TrendingUp className='w-3 h-3' />
                +15% cette semaine
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Clients récents et actions rapides */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Clients récents */}
          <Card className='lg:col-span-2 border-0 shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-xl font-semibold'>Clients récents</CardTitle>
              <Button variant='ghost' onClick={() => router.push('/clients')} className='text-primary hover:text-blue-700 hover:bg-primary-foreground'>
                Voir tout
                <ArrowRight className='w-4 h-4 ml-1' />
              </Button>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className='flex items-center justify-between p-4 rounded-xl
                 transition-colors cursor-pointer'
                    onClick={() => router.push(`/clients/${client.id}`)}
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className='w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full
                     flex items-center justify-center text-foreground font-semibold'
                      >
                        {client.prenom.charAt(0)}
                        {client.nom.charAt(0)}
                      </div>
                      <div>
                        <h4 className='font-semibold '>
                          {client.prenom} {client.nom}
                        </h4>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Building className='w-3 h-3' />
                          {client.entreprise}
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${client.statut === 'actif' ? 'bg-green-100 text-green-800' : client.statut === 'prospect' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>{client.statut}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card className='border-0 shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-semibold'>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Button className='w-full justify-start gap-3 bg-blue-600 hover:bg-blue-700 h-12' onClick={() => router.push('/clients/nouveau')}>
                <UserPlus className='w-5 h-5' />
                Ajouter un client
              </Button>

              <Button variant='outline' className='w-full justify-start gap-3 h-12 hover:bg-gray-50' onClick={() => router.push('/clients')}>
                <Users className='w-5 h-5' />
                Voir tous les clients
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
