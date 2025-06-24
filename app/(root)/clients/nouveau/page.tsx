'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, UserPlus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addClient } from '@/lib/features/clients/clientsSlice';
import ProtectedRoute from '@/components/ProtectedRoute';

const clientSchema = z.object({
  prenom: z.string().min(1, 'Le prénom est requis'),
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  entreprise: z.string().min(1, "L'entreprise est requise"),
  poste: z.string().optional(),
  statut: z.enum(['actif', 'prospect', 'inactif']),
  rue: z.string().min(1, "L'adresse est requise"),
  ville: z.string().min(1, 'La ville est requise'),
  codePostal: z.string().min(5, 'Code postal invalide'),
  pays: z.string().min(1, 'Le pays est requis'),
});

type ClientFormData = z.infer<typeof clientSchema>;

export default function NewClientPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.clients);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      entreprise: '',
      poste: '',
      statut: 'prospect',
      rue: '',
      ville: '',
      codePostal: '',
      pays: 'France',
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: ClientFormData) => {
    try {
      const clientData = {
        ...data,
        poste: data.poste ?? '', // Ensure poste is always a string
        tags,
        adresse: {
          rue: data.rue,
          ville: data.ville,
          codePostal: data.codePostal,
          pays: data.pays,
        },
      };

      // Remove address fields from root level
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rue, ville, codePostal, pays, ...clientWithoutAddress } = clientData;
      const finalClientData = {
        ...clientWithoutAddress,
        adresse: clientData.adresse,
      };

      await dispatch(addClient(finalClientData)).unwrap();
      toast.success('Client ajouté avec succès !');
      router.push('/clients');
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
      toast.error("Erreur lors de l'ajout du client");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ProtectedRoute>
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' onClick={() => router.push('/clients')} className='flex items-center gap-2 hover:bg-gray-100'>
          <ArrowLeft className='w-4 h-4' />
          Retour
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Nouveau client</h1>
          <p className='text-gray-600 text-lg'>Ajoutez un nouveau client à votre base</p>
        </div>
      </div>

      <div className='max-w-3xl mx-auto'>
        <Card className='border-0 shadow-lg'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-xl'>
              <UserPlus className='w-6 h-6' />
              Informations du client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mx-auto max-w-3xl'>
                {/* Informations personnelles */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='prenom'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Prénom *</FormLabel>
                        <FormControl>
                          <Input placeholder='John' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='nom'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder='Doe' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Informations de contact */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Email *</FormLabel>
                        <FormControl>
                          <Input type='email' placeholder='john.doe@exemple.com' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='telephone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder='01 23 45 67 89' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Informations professionnelles */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='entreprise'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Entreprise *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de l'entreprise" className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='poste'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Poste</FormLabel>
                        <FormControl>
                          <Input placeholder='Directeur commercial' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Statut */}
                <FormField
                  control={form.control}
                  name='statut'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold'>Statut</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-12'>
                            <SelectValue placeholder='Sélectionnez un statut' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='prospect'>Prospect</SelectItem>
                          <SelectItem value='actif'>Actif</SelectItem>
                          <SelectItem value='inactif'>Inactif</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Adresse */}
                <div className='space-y-6'>
                  <h3 className='text-lg font-semibold text-gray-900'>Adresse</h3>

                  <FormField
                    control={form.control}
                    name='rue'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-semibold'>Rue *</FormLabel>
                        <FormControl>
                          <Input placeholder='123 rue de la Paix' className='h-12' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <FormField
                      control={form.control}
                      name='codePostal'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-base font-semibold'>Code postal *</FormLabel>
                          <FormControl>
                            <Input placeholder='75001' className='h-12' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='ville'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-base font-semibold'>Ville *</FormLabel>
                          <FormControl>
                            <Input placeholder='Paris' className='h-12' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='pays'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-base font-semibold'>Pays *</FormLabel>
                          <FormControl>
                            <Input placeholder='France' className='h-12' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>Tags</h3>
                  <div className='flex gap-3'>
                    <Input placeholder='Ajouter un tag' value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyPress={handleKeyPress} className='h-12' />
                    <Button type='button' variant='outline' onClick={addTag} className='h-12 px-6'>
                      Ajouter
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag) => (
                        <Badge key={tag} variant='secondary' className='flex items-center gap-2 px-3 py-1'>
                          {tag}
                          <Button type='button' variant='ghost' size='sm' className='h-auto p-0 hover:bg-transparent' onClick={() => removeTag(tag)}>
                            <X className='w-3 h-3' />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Boutons de soumission */}
                <div className='flex gap-4 pt-6'>
                  <Button type='submit' className='bg-blue-600 hover:bg-blue-700 h-12 px-8' disabled={isLoading}>
                    {isLoading ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        Ajout en cours...
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <UserPlus className='w-5 h-5' />
                        Ajouter le client
                      </div>
                    )}
                  </Button>

                  <Button type='button' variant='outline' onClick={() => router.push('/clients')} className='h-12 px-8'>
                    Annuler
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div></ProtectedRoute>
  );
}
