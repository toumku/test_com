'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTRPC } from '@/lib/trpc/trpc';
import { useQuery } from '@tanstack/react-query';

export const description = 'Бүртгэлийн тоо';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  devices: {
    label: 'Төхөөрөмж',
    color: 'var(--chart-1)',
  },
  employees: {
    label: 'Бие бүрэлдэхүүн',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function DeviceChart() {
  const [timeRange, setTimeRange] = React.useState('90d');
  const trpc = useTRPC();
  const chart = useQuery(
    trpc.deviceEmployeeChartQuery.queryOptions({
      timeRange,
    })
  );

  const filteredData = chart.data?.chartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className='pt-0'>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1'>
          <CardTitle>Өгөгдөл бүртгэсэн байдал</CardTitle>
          <CardDescription>
            {`Сүүлийн ${timeRange.slice(0, -1)} хоногоор үзүүлж байна`}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className='hidden w-[160px] rounded-lg sm:ml-auto sm:flex'
            aria-label='Утга сонгоно уу'
          >
            <SelectValue placeholder='Сүүлийн 3 сар' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='90d' className='rounded-lg'>
              Сүүлийн 3 сар
            </SelectItem>
            <SelectItem value='30d' className='rounded-lg'>
              Сүүлийн 30 хоног
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              Сүүлийн 7 хоног
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillDevices' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-devices)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-devices)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillEmployees' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-employees)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-employees)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='devices'
              type='natural'
              fill='url(#fillEmployees)'
              stroke='var(--color-employees)'
              stackId='a'
            />
            <Area
              dataKey='employees'
              type='natural'
              fill='url(#fillDevices)'
              stroke='var(--color-devices)'
              stackId='a'
            />
            <ChartLegend
              content={<ChartLegendContent payload={<div>Hey</div>} />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
