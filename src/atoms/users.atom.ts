import { atom } from 'jotai';

export const usersScreenSelectedIdsAtom = atom<string[]>([]);

export type UserAddDialogAtom = {
  open: boolean;
  employeeId: string;
};

export const userAddDialogAtom = atom<UserAddDialogAtom>({
  open: false,
  employeeId: '',
});
