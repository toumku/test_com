'use client';

import { employeesScreenSelectedIdsAtom } from '@/atoms/employees.atom';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import {
  employeesDefaultPage,
  employeesDefaultTake,
  employeesDefaultSearch,
  employeesSortableColumns,
  employeesSortColumn,
  employeesSortDirection,
  employeesStartDate,
  employeesEndDate,
} from '@/configs/employees.config';
import { useEndDate } from '@/hooks/useEndDate';
import { usePage } from '@/hooks/usePage';
import { useSearch } from '@/hooks/useSearch';
import { useSortColumn } from '@/hooks/useSortColumn';
import { useSortDirection } from '@/hooks/useSortDirection';
import { useStartDate } from '@/hooks/useStartDate';
import { useTake } from '@/hooks/useTake';
import { EmployeesTable } from '@/tables/employees.table';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function EmployeesScreen() {
  const [page, setPage] = usePage(employeesDefaultPage);
  const [take, setTake] = useTake(employeesDefaultTake);
  const [search, setSearch] = useSearch(employeesDefaultSearch);
  const [localSearch, setLocalSearch] = useState(search);
  const [sortColumn, setSortColumn] = useSortColumn(
    employeesSortableColumns,
    employeesSortColumn
  );
  const [sortDirection, setSortDirection] = useSortDirection(
    employeesSortDirection
  );
  const [selectedIds, setSelectedIds] = useAtom(employeesScreenSelectedIdsAtom);
  const [startDate, setStartDate] = useStartDate(employeesStartDate);
  const [endDate, setEndDate] = useEndDate(employeesEndDate);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-start justify-between'>
        <Heading
          title={'Төвийн бие бүрэлдэхүүн'}
          description='Бүх бие бүрэлдэхүүний жагсаалт'
        />
      </div>

      <Separator />

      <EmployeesTable
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
