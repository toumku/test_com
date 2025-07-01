'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from '@/components/ui/card';
import { useTRPC } from '@/lib/trpc/trpc';
import { useQuery } from '@tanstack/react-query';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function TotalDevices() {
  const trpc = useTRPC();
  const chart = useQuery(trpc.totalDevicesQuery.queryOptions());

  if (chart.isPending) {
    return <LoadingSpinner />;
  }

  if (chart.isError) {
    return <div>Алдаа гарлаа</div>;
  }

  if (!chart.data) {
    return <div>Өгөгдөл хоосон байна</div>;
  }

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>Төхөөрөмжүүд</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {chart.data.lastMonthCount}
        </CardTitle>
        <CardAction>
          {chart.data.status === 'growing' ? (
            <Badge variant='outline'>
              <TrendingUp />+{chart.data.growthPercent}%
            </Badge>
          ) : (
            <Badge variant='outline'>
              <TrendingDown />+{chart.data.growthPercent}%
            </Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          Энэ сар өнгөрсөн сараас{' '}
          {chart.data.status === 'growing' ? ' өсөлттэй' : 'уналттай'} байна{' '}
          {chart.data.status === 'growing' ? (
            <TrendingUp className='size-4' />
          ) : (
            <TrendingDown className='size-4' />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
