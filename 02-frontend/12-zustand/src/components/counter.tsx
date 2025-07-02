"use client";

import { useCounterStore } from "@/lib/counter-store";

export default function Counter() {
  const { counter, increment, decrement } = useCounterStore();

  return (
    <div>
      <p>{counter}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
