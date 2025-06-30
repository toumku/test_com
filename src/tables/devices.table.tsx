import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DevicesSortableColumn } from '@/configs/devices.config';
import { useTRPC } from '@/lib/trpc/trpc';
import { SortDirection } from '@/variables/sort-direction';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  deviceAddDialogAtom,
  deviceEditDialogAtom,
} from '@/atoms/devices.atom';
import { DeviceAddDialog } from '@/dialogs/device-add-dialog';
import { DeviceEditDialog } from '@/dialogs/device-edit.dialog';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Paginate } from '@/components/paginate';
import { SearchBox } from '@/components/search-box';

export type DevicesTableProps = {
  page: number;
  setPage: (page: number) => void;
  take: number;
  setTake: (take: number) => void;
  search: string;
  setSearch: (search: string) => void;
  localSearch: string;
  setLocalSearch: (localSearch: string) => void;
  sortColumn: DevicesSortableColumn;
  setSortColumn: (sortColumn: DevicesSortableColumn) => void;
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

export function DevicesTable(props: DevicesTableProps) {
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
    trpc.devicesQuery.queryOptions({
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
  const [addDialog, setAddDialog] = useAtom(deviceAddDialogAtom);
  const [editDialog, setEditDialog] = useAtom(deviceEditDialogAtom);

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
            <TableHead>Төхөөрөмжийн нэр</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>HDD хэмжээ</TableHead>
            <TableHead>HDD брэнд</TableHead>
            <TableHead>Гар</TableHead>
            <TableHead>Хулгана</TableHead>
            <TableHead>Төрөл</TableHead>
            <TableHead>Бүртгэсэн хэрэглэгч</TableHead>
            <TableHead>Зассан хэрэглэгч</TableHead>
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
          ) : !data || data.devices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={99}>Өгөгдөл алга</TableCell>
            </TableRow>
          ) : (
            data.devices.map((device, index) => {
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
                addedName,
                editedName,
                // removedName,
                addedAt,
                editedAt,
                // removedAt,
              } = device;

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
                  <TableCell>{name}</TableCell>
                  <TableCell>{cpu}</TableCell>
                  <TableCell>{ram}</TableCell>
                  <TableCell>{hddSize}</TableCell>
                  <TableCell>{hddBrand}</TableCell>
                  <TableCell>{keyboard}</TableCell>
                  <TableCell>{mouse}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{addedName}</TableCell>
                  <TableCell>{editedName ? editedName : '-'}</TableCell>
                  <TableCell>
                    {dayjs(addedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    {editedAt
                      ? dayjs(editedAt).format('YYYY-MM-DD HH:mm:ss')
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

      {addDialog.open && <DeviceAddDialog onSuccess={onRefresh} />}
      {editDialog.open && <DeviceEditDialog onSuccess={onRefresh} />}
    </div>
  );
}
