import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { UsersSortableColumn } from '@/configs/users.config';
import { useTRPC } from '@/lib/trpc/trpc';
import { SortDirection } from '@/variables/sort-direction';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { userAddDialogAtom } from '@/atoms/users.atom';
import { UserAddDialog } from '@/dialogs/user-add-dialog';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Paginate } from '@/components/paginate';
import { SearchBox } from '@/components/search-box';

export type UsersTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: UsersSortableColumn;
  setSortColumn: (sortColumn: UsersSortableColumn) => void;
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

export function UsersTable(props: UsersTableProps) {
  const {
    page,
    setPage,
    take,
    // setTake,
    search,
    setSearch,
    localSearch,
    setLocalSearch,
    sortColumn,
    // setSortColumn,
    sortDirection,
    // setSortDirection,
    // selectedIds,
    setSelectedIds,
    // selectMultiple,
    startDate,
    // setStartDate,
    endDate,
    // setEndDate,

    filterUserIds,
  } = props;

  const trpc = useTRPC();
  const { isPending, isFetching, isError, error, data, refetch } = useQuery(
    trpc.usersQuery.queryOptions({
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
  const [addDialog, setAddDialog] = useAtom(userAddDialogAtom);

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
      employeeId: '',
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
            <TableHead>Нэр</TableHead>
            <TableHead>Цахим шуудан</TableHead>
            <TableHead>Цахим шуудан баталгаажсан эсэх</TableHead>
            <TableHead>Эрх</TableHead>
            <TableHead>Бүртгэсэн огноо</TableHead>
            <TableHead>Зассан огноо</TableHead>
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
          ) : !data || data.users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={99}>Өгөгдөл алга</TableCell>
            </TableRow>
          ) : (
            data.users.map((user, index) => {
              const {
                id,
                name,
                email,
                emailVerified,
                role,
                createdAt,
                updatedAt,
              } = user;

              return (
                <TableRow key={id}>
                  <TableCell></TableCell>
                  <TableCell className='font-medium'>
                    {(page - 1) * take + (index + 1)}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{emailVerified}</TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>
                    {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {updatedAt
                      ? dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')
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
        found={data?.total || 0}
      />

      {addDialog.open && <UserAddDialog onSuccess={onRefresh} />}
    </div>
  );
}
