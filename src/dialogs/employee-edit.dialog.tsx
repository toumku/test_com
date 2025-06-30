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
  employeeEditSchema,
  EmployeeEditSchema,
  employeeEditSchemaDefaultValues,
} from '@/schemas/employees.schema';
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
import { ranks } from '@/variables/ranks';
import { useTRPC } from '@/lib/trpc/trpc';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { employeeEditDialogAtom } from '@/atoms/employees.atom';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export type EmployeeEditDialogProps = {
  onSuccess(): void;
};

export function EmployeeEditDialog(props: EmployeeEditDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(employeeEditDialogAtom);
  const trpc = useTRPC();
  const form = useForm<EmployeeEditSchema>({
    resolver: zodResolver(employeeEditSchema),
    defaultValues: employeeEditSchemaDefaultValues,
  });
  const editEmployee = useMutation(
    trpc.employeeEditMutation.mutationOptions({
      onError(err) {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(`${data.employee.firstName} засагдлаа`);

        setDialog({
          open: false,
          id: '',
        });

        onSuccess();
      },
    })
  );
  const { data, isPending } = useQuery(
    trpc.employeeQuery.queryOptions({ id: dialog.id })
  );

  useEffect(() => {
    if (data?.employee) {
      const { id, lastName, firstName, rank, position, birthday } =
        data.employee;

      form.setValue('id', id);
      form.setValue('lastName', lastName);
      form.setValue('firstName', firstName);
      form.setValue('rank', rank);
      form.setValue('position', position);
      form.setValue('birthday', birthday);
    }
  }, [data, form]);

  function onSubmit(data: EmployeeEditSchema) {
    editEmployee.mutate(data);
  }

  function onOpen(open: boolean) {
    setDialog({
      open,
      id: open ? dialog.id : '',
    });
  }

  return (
    <Dialog open={dialog.open} onOpenChange={onOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Төвийн бүрэлдэхүүн засах</DialogTitle>
            </DialogHeader>

            {isPending ? (
              <LoadingSpinner />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Овог</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='firstName'
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
                  name='rank'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цол</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className='w-full'>
                          <SelectTrigger>
                            <SelectValue placeholder='Цол сонгоно уу' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ranks.map(rank => (
                            <SelectItem key={rank} value={rank}>
                              {rank}
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
                  name='position'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Албан тушаал</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='birthday'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Төрсөн өдөр</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant='outline'>Цуцлах</Button>
                  </DialogClose>
                  <Button type='submit' disabled={editEmployee.isPending}>
                    Засах
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
