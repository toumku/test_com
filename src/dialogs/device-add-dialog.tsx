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
  deviceAddSchema,
  DeviceAddSchema,
  deviceAddSchemaDefaultValues,
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
import { deviceAddDialogAtom } from '@/atoms/devices.atom';
import { deviceTypes } from '@/variables/deviceTypes';
import { ChangeEvent } from 'react';

export type DeviceAddDialogProps = {
  onSuccess(): void;
};

export function DeviceAddDialog(props: DeviceAddDialogProps) {
  const { onSuccess } = props;
  const [dialog, setDialog] = useAtom(deviceAddDialogAtom);
  const trpc = useTRPC();
  const form = useForm<DeviceAddSchema>({
    resolver: zodResolver(deviceAddSchema),
    defaultValues: deviceAddSchemaDefaultValues,
  });
  const addDevice = useMutation(
    trpc.deviceAddMutation.mutationOptions({
      onError(err) {
        toast.error(err.message);
      },
      onSuccess(data) {
        toast.success(`${data.device.name} бүртгэгдлээ`);

        setDialog({
          open: false,
        });

        onSuccess();
      },
    })
  );
  const employeesQuery = useQuery(trpc.employeesQuery.queryOptions({}));

  function onSubmit(data: DeviceAddSchema) {
    addDevice.mutate(data);
  }

  function setOpen(open: boolean) {
    setDialog({
      open,
    });
  }

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      toast.warning('Файлаа сонгоно уу');

      return;
    }

    const file = files[0];

    if (!file) {
      toast.warning('Файлаа сонгоно уу');

      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data?.url) {
      form.setValue('imageURL', data.url);
    }
  }

  return (
    <Dialog open={dialog.open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <DialogHeader>
              <DialogTitle>Төвийн бүрэлдэхүүн нэмэх</DialogTitle>
            </DialogHeader>

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
              name='imageURL'
              render={({}) => (
                <FormItem>
                  <FormLabel>Зураг</FormLabel>
                  <FormControl>
                    <Input type='file' onChange={onFile} />
                  </FormControl>
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
                        <SelectValue placeholder='Төрөл сонгоно уу' />
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
              <Button type='submit' disabled={addDevice.isPending}>
                Нэмэх
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
