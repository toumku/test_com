'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import {
  userAddSchema,
  UserAddSchema,
  userAddSchemaDefaultValues,
} from '@/schemas/users.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTRPC } from '@/lib/trpc/trpc';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { userAddDialogAtom } from '@/atoms/users.atom';
import { roles } from '@/variables/roles';

export type UserAddDialogProps = {
  onSuccess(): void;
};

export function UserAddDialog(props: UserAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(userAddDialogAtom);
  const trpc = useTRPC();
  const form = useForm<UserAddSchema>({
    resolver: zodResolver(userAddSchema),
    defaultValues: {
      ...userAddSchemaDefaultValues,
      employeeId: dialog.employeeId,
    },
  });
  const addUser = useMutation(
    trpc.userAddMutation.mutationOptions({
      onError(err) {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(`${data.session.user.name} бүртгэгдлээ`);

        setDialog({
          open: false,
          employeeId: '',
        });

        onSuccess();
      },
    })
  );

  function onSubmit(data: UserAddSchema) {
    addUser.mutate(data);
  }

  function setOpen(open: boolean) {
    setDialog({
      open,
      employeeId: open ? dialog.employeeId : '',
    });
  }

  return (
    <Dialog open={dialog.open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Хэрэглэгч олгох</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цахим шуудан</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Эрх</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className='w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder='Эрх сонгоно уу' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Цуцлах</Button>
              </DialogClose>
              <Button type='submit' disabled={addUser.isPending}>
                Олгох
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
