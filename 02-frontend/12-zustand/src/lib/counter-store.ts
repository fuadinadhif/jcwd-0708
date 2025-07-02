import { create } from "zustand";

interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => {
  return {
    counter: 0,
    increment: () =>
      set((state) => {
        return { counter: state.counter + 1 };
      }),
    decrement: () => {
      set((state) => {
        return { counter: state.counter - 1 };
      });
    },
  };
});
