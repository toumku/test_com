import { atom } from 'jotai';

export const devicesScreenSelectedIdsAtom = atom<string[]>([]);

export type DeviceAddDialogAtom = {
  open: boolean;
};

export const deviceAddDialogAtom = atom<DeviceAddDialogAtom>({
  open: false,
});

export type DeviceEditDialogAtom = {
  open: boolean;
  id: string;
};

export const deviceEditDialogAtom = atom<DeviceEditDialogAtom>({
  open: false,
  id: '',
});
