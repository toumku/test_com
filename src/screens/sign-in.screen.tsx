'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signIn } from '@/lib/auth-client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  SignInSchema,
  signInSchema,
  signInSchemaDefaultValues,
} from '../schemas/sign-in.schena';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function SignInScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInSchemaDefaultValues,
  });

  async function onSubmit(data: SignInSchema) {
    const { email, password } = data;

    await signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onError: ctx => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          router.push('/');
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className='max-w-md'>
          <CardHeader>
            <CardTitle className='text-lg md:text-xl'>Нэвтрэх</CardTitle>
            <CardDescription className='text-xs md:text-sm'>
              Бүртгүүлсэн мэдээллээрээ нэвтэрнэ үү
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
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
            <Button type='submit'>
              {loading ? (
                <Loader2 size={16} className='animate-spin' />
              ) : (
                'Нэвтрэх'
              )}
            </Button>
          </CardContent>
          <CardFooter>
            <div className='flex justify-center w-full border-t py-4'>
              <p className='text-center text-xs text-neutral-500'>
                Бүртгэлгүй бол{' '}
                <Link href='/auth/sign-up'>
                  <span className='dark:text-white/70 cursor-pointer text-orange-400'>
                    Бүртгүүлэх
                  </span>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
