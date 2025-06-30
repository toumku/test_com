import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmployeesSortableColumn } from '@/configs/employees.config';
import { useTRPC } from '@/lib/trpc/trpc';
import { SortDirection } from '@/variables/sort-direction';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  employeeAddDialogAtom,
  employeeEditDialogAtom,
} from '@/atoms/employees.atom';
import { EmployeeAddDialog } from '@/dialogs/employee-add-dialog';
import { EmployeeEditDialog } from '@/dialogs/employee-edit.dialog';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Paginate } from '@/components/paginate';
import { SearchBox } from '@/components/search-box';

export type EmployeesTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: EmployeesSortableColumn;
  setSortColumn: (sortColumn: EmployeesSortableColumn) => void;
  sortDirection: SortDirection;
  setSortDirection: (sortDirection: SortDirection) => void;
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
  selectMultiple: boolean;
  startDate: number;
  setStartDate: (startDate: number) => void;
  endDate: number;
  setEndDate: (endDate: number) => void;

  filterUserIds?: string;
};

export function EmployeesTable(props: EmployeesTableProps) {
  const {
    page,
    setPage,
    take,
    setTake,
    search,
    setSearch,
    localSearch,
    setLocalSearch,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    selectedIds,
    setSelectedIds,
    selectMultiple,
    startDate,
    setStartDate,
    endDate,
    setEndDate,

    filterUserIds,
  } = props;

  const trpc = useTRPC();
  const { isPending, isFetching, isError, error, data, refetch } = useQuery(
    trpc.employeesQuery.queryOptions({
      page,
      take,
      search,
      sortColumn,
      sortDirection,
      startDate,
      endDate,
      filterUserIds,
    })
  );
  const [addDialog, setAddDialog] = useAtom(employeeAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(employeeEditDialogAtom);

  useEffect(() => {
    setPage(1);
    setSelectedIds([]);
  }, [
    search,
    startDate,
    endDate,
    take,
    sortColumn,
    sortDirection,
    setPage,
    setSelectedIds,
  ]);

  function onAdd() {
    setAddDialog({
      open: true,
    });
  }

  function onEdit(id: string) {
    setEditDialog({
      open: true,
      id,
    });
  }

  function onRefresh() {
    refetch();
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <SearchBox
          search={search}
          setSearch={setSearch}
          localSearch={localSearch}
          setLocalSearch={setLocalSearch}
        />
        <Button variant='outline' onClick={onAdd}>
          Нэмэх
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className='w-[100px]'>#</TableHead>
            <TableHead>Овог</TableHead>
            <TableHead>Нэр</TableHead>
            <TableHead>Цол</TableHead>
            <TableHead>Бүртгэсэн хэрэглэгч</TableHead>
            <TableHead>Зассан хэрэглэгч</TableHead>
            <TableHead>Устгасан хэрэглэгч</TableHead>
            <TableHead>Бүртгэсэн огноо</TableHead>
            <TableHead>Зассан огноо</TableHead>
            <TableHead>Устгасан огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending || isFetching ? (
            <TableRow>
              <TableCell colSpan={99}>
                <LoadingSpinner />
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={99}>{error.message}</TableCell>
            </TableRow>
          ) : !data || data.employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={99}>Өгөгдөл алга</TableCell>
            </TableRow>
          ) : (
            data.employees.map((employee, index) => {
              const {
                id,
                lastName,
                firstName,
                rank,
                addedName,
                editedName,
                removedName,
                addedAt,
                editedAt,
                removedAt,
              } = employee;

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      onClick={() => onEdit(id)}
                    >
                      <Pencil />
                    </Button>
                  </TableCell>
                  <TableCell className='font-medium'>
                    {(page - 1) * take + (index + 1)}
                  </TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{rank}</TableCell>
                  <TableCell>{addedName}</TableCell>
                  <TableCell>{editedName ? editedName : '-'}</TableCell>
                  <TableCell>{removedName ? removedName : '-'}</TableCell>
                  <TableCell>
                    {dayjs(addedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {editedAt
                      ? dayjs(editedAt).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {removedAt
                      ? dayjs(removedAt).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <Paginate
        page={page}
        setPage={setPage}
        take={take}
        total={data?.total || 0}
        found={data?.found || 0}
      />

      {addDialog.open && <EmployeeAddDialog onSuccess={onRefresh} />}
      {editDialog.open && <EmployeeEditDialog onSuccess={onRefresh} />}
    </div>
  );
}
