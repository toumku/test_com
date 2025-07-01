'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { useTRPC } from '@/lib/trpc/trpc';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { deviceImageDialogAtom } from '@/atoms/devices.atom';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export function DeviceImageDialog() {
  const [imageURL, setImageURL] = useState('');
  const [dialog, setDialog] = useAtom(deviceImageDialogAtom);
  const trpc = useTRPC();
  const { data, isPending } = useQuery(
    trpc.deviceQuery.queryOptions({ id: dialog.id })
  );

  useEffect(() => {
    if (data?.device) {
      setImageURL(data.device.imageURL || '');
    }
  }, [data]);

  function onOpen(open: boolean) {
    setDialog({
      open,
      id: open ? dialog.id : '',
    });
  }

  return (
    <Dialog open={dialog.open} onOpenChange={onOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Хавсгарсан зураг</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <LoadingSpinner />
        ) : !imageURL ? (
          <p> Зураг байхгүй байна</p>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageURL} alt='Uploaded' className='w-full' />
        )}
      </DialogContent>
    </Dialog>
  );
}
