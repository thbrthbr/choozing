import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Types {
  temp: string;
  setTemp: (temp: string) => void;
}

const DataStore = create<Types>((set) => ({
  temp: '안녕',
  setTemp: (input) => set({ temp: input }),
}));

export { DataStore };
