'use client';

import { ArrowLeft, Building, Calendar, Mail, MapPin, Phone, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Client } from '@/lib/features/clients/clientsSlice';


const statutColors = {
  actif: 'bg-green-100 text-green-800 hover:bg-green-200',
  prospect: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  inactif: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

const typeColors = {
  appel: 'bg-blue-100 text-blue-800',
  email: 'bg-purple-100 text-purple-800',
  reunion: 'bg-orange-100 text-orange-800',
  note: 'bg-gray-100 text-gray-800',
};

const typeIcons = {
  appel: Phone,
  email: Mail,
  reunion: Calendar,
  note: Tag,
};

interface ClientDetailPageProps {
  client: Client;
}

export function ClientDetailPage({ client }: ClientDetailPageProps) {
  const initials = `${client.prenom.charAt(0)}${client.nom.charAt(0)}`;

  return (
    <div className='container mx-auto py-6 space-y-6'>
      
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link href='/clients'>
            <Button variant='outline' size='sm'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Retour à la liste
            </Button>
          </Link>
          <div>
            <h1 className='text-3xl font-bold'>
              {client.prenom} {client.nom}
            </h1>
            <p className='text-muted-foreground'>
              {client.poste} chez {client.entreprise}
            </p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button>Modifier</Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <User className='h-5 w-5 mr-2' />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-medium'>Email</span>
                  </div>
                  <p className='text-sm'>{client.email}</p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Phone className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-medium'>Téléphone</span>
                  </div>
                  <p className='text-sm'>{client.telephone}</p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <Building className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-medium'>Entreprise</span>
                  </div>
                  <p className='text-sm'>{client.entreprise}</p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center space-x-2'>
                    <User className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm font-medium'>Poste</span>
                  </div>
                  <p className='text-sm'>{client.poste}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <MapPin className='h-5 w-5 mr-2' />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-1'>
                <p className='text-sm'>{client.adresse.rue}</p>
                <p className='text-sm'>
                  {client.adresse.codePostal} {client.adresse.ville}
                </p>
                <p className='text-sm font-medium'>{client.adresse.pays}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historique des interactions</CardTitle>
              <CardDescription>{client.historique.length} interaction(s) enregistrée(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {client.historique.length > 0 ? (
                  client.historique
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((interaction) => {
                      const Icon = typeIcons[interaction.type];
                      return (
                        <div key={interaction.id} className='flex items-start space-x-4'>
                          <div className='flex-shrink-0'>
                            <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
                              <Icon className='h-4 w-4' />
                            </div>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-2'>
                                <h4 className='text-sm font-medium'>{interaction.titre}</h4>
                                <Badge className={typeColors[interaction.type]} variant='secondary'>
                                  {interaction.type}
                                </Badge>
                              </div>
                              <time className='text-xs text-muted-foreground'>
                                {new Date(interaction.date).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>
                            <p className='text-sm text-muted-foreground mt-1'>{interaction.description}</p>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <p className='text-sm text-muted-foreground text-center py-4'>Aucune interaction enregistrée</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col items-center text-center space-y-4'>
                <Avatar className='h-20 w-20'>
                  <AvatarFallback className='text-lg font-semibold'>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold'>
                    {client.prenom} {client.nom}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{client.poste}</p>
                </div>
                <Badge className={statutColors[client.statut]}>{client.statut}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {client.tags.map((tag) => (
                  <Badge key={tag} variant='outline'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dates importantes */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Dates importantes</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <div className='flex items-center space-x-2 mb-1'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm font-medium'>Date de création</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {new Date(client.dateCreation).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <div className='flex items-center space-x-2 mb-1'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span className='text-sm font-medium'>Dernière activité</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {new Date(client.derniereActivite).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base'>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Button variant='outline' className='w-full justify-start'>
                <Mail className='h-4 w-4 mr-2' />
                Envoyer un email
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                <Phone className='h-4 w-4 mr-2' />
                Programmer un appel
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                <Calendar className='h-4 w-4 mr-2' />
                Planifier une réunion
              </Button>
              <Button variant='outline' className='w-full justify-start'>
                <Tag className='h-4 w-4 mr-2' />
                Ajouter une note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
