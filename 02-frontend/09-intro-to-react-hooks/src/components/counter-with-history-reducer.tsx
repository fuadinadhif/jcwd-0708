"use client";

import { counterReducer } from "@/reducers/counter.reducer";
import { useReducer } from "react";

export default function CounterWithHistoryReducer() {
  const [state, dispatch] = useReducer(counterReducer, {
    counter: 0,
    history: [],
  });

  return (
    <div className="card grid">
      <p>{state.counter}</p>
      <div className="flex gap-2">
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={() => dispatch("incrementByOne")}
        >
          +1
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={() => dispatch("decrementByOne")}
        >
          -1
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={() => dispatch("incrementByFive")}
        >
          +5
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={() => dispatch("decrementByFive")}
        >
          -5
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={() => dispatch("resetCounter")}
        >
          reset
        </button>
      </div>
      <div>
        <button
          className="bg-fuchsia-300 p-2 rounded-sm"
          onClick={() => dispatch("resetHistory")}
        >
          reset
        </button>
        {state.history.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
