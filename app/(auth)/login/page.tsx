'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      router.push('/dashboard');
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='w-full max-w-md'>
        <Card className='border-0 shadow-2xl'>
          <CardHeader className='text-center pb-2'>
            <div className='mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4'>
              <LogIn className='w-6 h-6 ' />
            </div>
            <CardTitle className='text-2xl font-bold'>Connexion</CardTitle>
            <p className='mt-2'>Connectez-vous à votre compte CRM</p>
          </CardHeader>

          <CardContent className='pt-4'>
            {error && (
              <Alert className='mb-4 border-red-200 bg-red-50'>
                <AlertDescription className='text-red-800'>{error}</AlertDescription>
              </Alert>
            )}

            {/* Demo credentials info */}
            <div className='mb-4 p-3 bg-primary/50 rounded-lg border border-primary'>
              <p className='text-sm font-medium mb-1'>Démo - Identifiants:</p>
              <p className='text-xs '>Email: admin@example.com</p>
              <p className='text-xs '>Mot de passe: password123</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium '>Email</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder='votre.email@exemple.com' className='h-11' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium '>Mot de passe</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input type={showPassword ? 'text' : 'password'} placeholder='Votre mot de passe' className='h-11 pr-10' {...field} />
                          <Button type='button' variant='ghost' size='sm' className='absolute right-0 top-0 h-11 px-3 hover:bg-transparent' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className='w-4 h-4 text-gray-400' /> : <Eye className='w-4 h-4 text-gray-400' />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full h-11' disabled={isLoading}>
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 rounded-full animate-spin' />
                      Connexion...
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <LogIn className='w-4 h-4' />
                      Se connecter
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
