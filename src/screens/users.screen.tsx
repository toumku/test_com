'use client';

import { usersScreenSelectedIdsAtom } from '@/atoms/users.atom';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import {
  usersDefaultPage,
  usersDefaultTake,
  usersDefaultSearch,
  usersSortableColumns,
  usersSortColumn,
  usersSortDirection,
  usersStartDate,
  usersEndDate,
} from '@/configs/users.config';
import { useEndDate } from '@/hooks/useEndDate';
import { usePage } from '@/hooks/usePage';
import { useSearch } from '@/hooks/useSearch';
import { useSortColumn } from '@/hooks/useSortColumn';
import { useSortDirection } from '@/hooks/useSortDirection';
import { useStartDate } from '@/hooks/useStartDate';
import { useTake } from '@/hooks/useTake';
import { UsersTable } from '@/tables/users.table';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function UsersScreen() {
  const [page, setPage] = usePage(usersDefaultPage);
  const [take, setTake] = useTake(usersDefaultTake);
  const [search, setSearch] = useSearch(usersDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    usersSortableColumns,
    usersSortColumn
  );
  const [sortDirection, setSortDirection] =
    useSortDirection(usersSortDirection);
  const [selectedIds, setSelectedIds] = useAtom(usersScreenSelectedIdsAtom);
  const [startDate, setStartDate] = useStartDate(usersStartDate);
  const [endDate, setEndDate] = useEndDate(usersEndDate);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start justify-between'>
        <Heading
          title={'Хэрэглэгчид'}
          description='Программд хандах эрх бүхий хэрэглэгчид'
        />
      </div>

      <Separator />

      <UsersTable
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
