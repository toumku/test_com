'use client';

import { Input } from './ui/input';

export type SearchBoxProps = {
  search: string;
  setSearch(search: string): void;
  localSearch: string;
  setLocalSearch(localSearch: string): void;
};

export function SearchBox(props: SearchBoxProps) {
  const { setSearch, localSearch, setLocalSearch } = props;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        setSearch(localSearch);
      }}
      className='max-w-3xs'
    >
      <Input
        placeholder={'Хайх үгээ бичнэ үү'}
        onChange={event => setLocalSearch(event.target.value)}
        value={localSearch}
      />
    </form>
  );
}
