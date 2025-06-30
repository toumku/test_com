'use client';

import { devicesScreenSelectedIdsAtom } from '@/atoms/devices.atom';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import {
  devicesDefaultPage,
  devicesDefaultTake,
  devicesDefaultSearch,
  devicesSortableColumns,
  devicesSortColumn,
  devicesSortDirection,
  devicesStartDate,
  devicesEndDate,
} from '@/configs/devices.config';
import { useEndDate } from '@/hooks/useEndDate';
import { usePage } from '@/hooks/usePage';
import { useSearch } from '@/hooks/useSearch';
import { useSortColumn } from '@/hooks/useSortColumn';
import { useSortDirection } from '@/hooks/useSortDirection';
import { useStartDate } from '@/hooks/useStartDate';
import { useTake } from '@/hooks/useTake';
import { DevicesTable } from '@/tables/devices.table';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function DevicesScreen() {
  const [page, setPage] = usePage(devicesDefaultPage);
  const [take, setTake] = useTake(devicesDefaultTake);
  const [search, setSearch] = useSearch(devicesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    devicesSortableColumns,
    devicesSortColumn
  );
  const [sortDirection, setSortDirection] =
    useSortDirection(devicesSortDirection);
  const [selectedIds, setSelectedIds] = useAtom(devicesScreenSelectedIdsAtom);
  const [startDate, setStartDate] = useStartDate(devicesStartDate);
  const [endDate, setEndDate] = useEndDate(devicesEndDate);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start justify-between'>
        <Heading
          title={'Төхөөрөмжүүд'}
          description='Компьютерийн хувийг хэрэг хөтлөх дэвтэр'
        />
      </div>

      <Separator />

      <DevicesTable
        page={page}
        setPage={setPage}
        take={take}
        setTake={setTake}
        search={search}
        setSearch={setSearch}
        localSearch={localSearch}
        setLocalSearch={setLocalSearch}
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        selectMultiple={true}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}
