import { atom } from 'jotai';

export const cartAtom = atom<{ id: string, name: string, price: number }[]>([]);
export const isCartOpenAtom = atom(false);
