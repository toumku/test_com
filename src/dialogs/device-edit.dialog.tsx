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
  deviceEditSchema,
  DeviceEditSchema,
  deviceEditSchemaDefaultValues,
} from '@/schemas/devices.schema';
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
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { deviceEditDialogAtom } from '@/atoms/devices.atom';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { deviceTypes } from '@/variables/deviceTypes';

export type DeviceEditDialogProps = {
  onSuccess(): void;
};

export function DeviceEditDialog(props: DeviceEditDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(deviceEditDialogAtom);
  const trpc = useTRPC();
  const form = useForm<DeviceEditSchema>({
    resolver: zodResolver(deviceEditSchema),
    defaultValues: deviceEditSchemaDefaultValues,
  });
  const editDevice = useMutation(
    trpc.deviceEditMutation.mutationOptions({
      onError(err) {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(`${data.device.name} засагдлаа`);

        setDialog({
          open: false,
          id: '',
        });

        onSuccess();
      },
    })
  );
  const { data, isPending } = useQuery(
    trpc.deviceQuery.queryOptions({ id: dialog.id })
  );
  const employeesQuery = useQuery(trpc.employeesQuery.queryOptions({}));

  useEffect(() => {
    if (data?.device) {
      const {
        id,
        name,
        cpu,
        ram,
        hddSize,
        hddBrand,
        keyboard,
        mouse,
        type,
        employeeId,
      } = data.device;

      form.setValue('id', id);
      form.setValue('name', name);
      form.setValue('cpu', cpu);
      form.setValue('ram', ram);
      form.setValue('hddSize', hddSize);
      form.setValue('hddBrand', hddBrand || '');
      form.setValue('keyboard', keyboard || '');
      form.setValue('mouse', mouse || '');
      form.setValue('type', type);
      form.setValue('employeeId', employeeId);
    }
  }, [data, form]);

  function onSubmit(data: DeviceEditSchema) {
    editDevice.mutate(data);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <DialogHeader>
              <DialogTitle>Төвийн бүрэлдэхүүн засах</DialogTitle>
            </DialogHeader>

            {isPending ? (
              <LoadingSpinner />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name='employeeId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Эзэмшигч</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className='w-full'>
                          <SelectTrigger>
                            <SelectValue placeholder='Эзэмшигч сонгоно уу' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employeesQuery.data?.employees.map(employee => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.lastName + ' ' + employee.firstName}
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
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Төхөөрөмжийн нэр</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='cpu'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='ram'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RAM</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='hddSize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HDD хэмжээ</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='hddBrand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HDD брэнд</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='keyboard'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Гар</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='mouse'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Хулгана</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Төрөл</FormLabel>
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
                          {deviceTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                  <Button type='submit' disabled={editDevice.isPending}>
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
