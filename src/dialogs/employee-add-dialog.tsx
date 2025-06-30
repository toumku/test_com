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
  employeeAddSchema,
  EmployeeAddSchema,
  employeeAddSchemaDefaultValues,
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
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { employeeAddDialogAtom } from '@/atoms/employees.atom';

export type EmployeeAddDialogProps = {
  onSuccess(): void;
};

export function EmployeeAddDialog(props: EmployeeAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(employeeAddDialogAtom);
  const trpc = useTRPC();
  const form = useForm<EmployeeAddSchema>({
    resolver: zodResolver(employeeAddSchema),
    defaultValues: employeeAddSchemaDefaultValues,
  });
  const addEmployee = useMutation(
    trpc.employeeAddMutation.mutationOptions({
      onError(err) {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(`${data.employee.firstName} бүртгэгдлээ`);

        setDialog({
          open: false,
        });

        onSuccess();
      },
    })
  );

  function onSubmit(data: EmployeeAddSchema) {
    addEmployee.mutate(data);
  }

  function setOpen(open: boolean) {
    setDialog({
      open,
    });
  }

  return (
    <Dialog open={dialog.open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Төвийн бүрэлдэхүүн нэмэх</DialogTitle>
            </DialogHeader>

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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Цуцлах</Button>
              </DialogClose>
              <Button type='submit' disabled={addEmployee.isPending}>
                Нэмэх
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
