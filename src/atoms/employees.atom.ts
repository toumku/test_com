import { atom } from 'jotai';

export const employeesScreenSelectedIdsAtom = atom<string[]>([]);

export type EmployeeAddDialogAtom = {
  open: boolean;
};

export const employeeAddDialogAtom = atom<EmployeeAddDialogAtom>({
  open: false,
});

export type EmployeeEditDialogAtom = {
  open: boolean;
  id: string;
};

export const employeeEditDialogAtom = atom<EmployeeEditDialogAtom>({
  open: false,
  id: '',
});
