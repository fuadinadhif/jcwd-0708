"use client";

import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="card">
      <button
        className="p-2 rounded-sm bg-sky-300"
        onMouseDown={() => {
          setCounter(counter + 1);
        }}
        onMouseUp={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </button>
      <p>{counter}</p>
      <button
        className="p-2 rounded-sm bg-green-300"
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        -
      </button>
    </div>
  );
}

/* ---------------------------------- NOTES --------------------------------- */
// function useCustomeState(defaultValue: number) {
//   let value = defaultValue;
//   const setValue = (inputValue) => (value = inputValue);

//   return [value, setValue];
// }

// const timerState = useCustomeState(10);
// const timer = timerState[0];
// const setTimer = timerState[1];

// const [timer, setTImer] = useCustomeState(10);
