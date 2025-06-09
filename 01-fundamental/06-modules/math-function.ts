export default function sum(num1: number, num2: number): number {
  return num1 + num2;
}

export function subtract(num1: number, num2: number): number {
  return num1 - num2;
}

export function multiply(num1: number, num2: number): number {
  return num1 * num2;
}

/* ---------------------------------- NOTES --------------------------------- */
// 1. export DEFAULT -> export default [FUNCTION_NAME]
// - Hanya boleh ada satu di dalam satu file

// 2. export NAMED -> export [FUNCTION_NAME]
// - Boleh sebanyak yang kita butuhkan
