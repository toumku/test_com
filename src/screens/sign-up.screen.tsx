'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signUp } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  signUpSchema,
  SignUpSchema,
  signUpSchemaDefaultValues,
} from '@/schemas/sign-up.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';

export default function SignUpScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpSchemaDefaultValues,
  });

  async function onSubmit(data: SignUpSchema) {
    const { email, name, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error('Нууц үг таарахгүй байна');

      return;
    }

    await signUp.email({
      email,
      password,
      name,
      callbackURL: '/',
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: ctx => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          router.push('/');
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className='z-50 rounded-md rounded-t-none max-w-md'>
          <CardHeader>
            <CardTitle className='text-lg md:text-xl'>Бүртгүүлэх</CardTitle>
            <CardDescription className='text-xs md:text-sm'>
              Үнэн зөв мэдээлэл оруулна уу
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цахим шуудан</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Нууц үг</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Батлах нууц үг</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>
              {loading ? (
                <Loader2 size={16} className='animate-spin' />
              ) : (
                'Бүртгүүлэх'
              )}
            </Button>
          </CardContent>
          <CardFooter>
            <div className='flex justify-center w-full border-t py-4'>
              <p className='text-center text-xs text-neutral-500'>
                Бүртгэлтэй юу?{' '}
                <Link href='/auth/sign-in'>
                  <span className='text-orange-400'>Нэвтрэх</span>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
