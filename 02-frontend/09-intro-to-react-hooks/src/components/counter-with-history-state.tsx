"use client";

import { useState } from "react";

export default function CounterWithHistoryState() {
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  function incrementByOne() {
    setCounter(counter + 1);
    setHistory([...history, "Increment by 1"]);
  }

  function decrementByOne() {
    setCounter((prev) => {
      const latestCounter = prev - 1;

      if (latestCounter >= 0) {
        setHistory([...history, "Decrement by 1"]);
        return latestCounter;
      } else {
        return prev;
      }
    });
  }

  function incrementByFive() {
    setCounter(counter + 5);
    setHistory([...history, "Increment by 5"]);
  }

  function decrementByFive() {
    if (counter >= 5) {
      setCounter(counter - 5);
      setHistory([...history, "Decrement by 5"]);
    }
  }

  function resetCounter() {
    setCounter(0);
    setHistory([...history, "Reset to 0"]);
  }

  function resetHistory() {
    setHistory([]);
  }

  return (
    <div className="card grid">
      <p>{counter}</p>
      <div className="flex gap-2">
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={incrementByOne}
        >
          +1
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={decrementByOne}
        >
          -1
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={incrementByFive}
        >
          +5
        </button>
        <button
          className="bg-amber-300 p-2 rounded-sm"
          onClick={decrementByFive}
        >
          -5
        </button>
        <button className="bg-amber-300 p-2 rounded-sm" onClick={resetCounter}>
          reset
        </button>
      </div>
      <div>
        <button
          className="bg-fuchsia-300 p-2 rounded-sm"
          onClick={resetHistory}
        >
          reset
        </button>
        {history.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
