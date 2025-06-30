import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export type PaginateProps = {
  page: number;
  setPage(page: number): void;
  take: number;
  total: number;
  found: number;
};

export function Paginate(props: PaginateProps) {
  const { page, setPage, take, total, found } = props;
  const totalPage = Math.ceil(found / take);

  function onFirstPage() {
    setPage(1);
  }

  function onPreviousPage() {
    if (page - 1 > 0) setPage(page - 1);
  }

  function onNextPage() {
    if (page + 1 <= Math.ceil(total / take)) setPage(page + 1);
  }

  function onLastPage() {
    setPage(Math.ceil(total / take));
  }

  return (
    <Pagination className='justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst onClick={onFirstPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious onClick={onPreviousPage} />
        </PaginationItem>
        {Array.from({ length: totalPage }).map((_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink>{index + 1}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={onNextPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast onClick={onLastPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
