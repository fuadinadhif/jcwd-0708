/* -------------------------------------------------------------------------- */
/*                          Space and Time Complexity                         */
/* -------------------------------------------------------------------------- */
/* ----------------------------- Calculate Time ----------------------------- */
// console.time("Loop");
// for (let i = 0; i < 10_000_000; i++) {}
// console.timeEnd("Loop");

/* ---------------------------- 1 Time Complexity --------------------------- */
function printNumbers(num: number) {
  console.log("Print start!"); // 1 time
  for (let i = 0; i <= num; i++) {
    // console.log(i);
  } // n times
  for (let i = 0; i <= 10; i++) {} // 11 times
  // console.log("Print end!"); // 1 time
}

// 1 + n + 11 + 1
// 1 + 1 + 11 + n
// 1 + 12 + n
// 13 + n
// n -> O(n) -> Linear

// --- Why ignore constant

// n = 10
// 1 + 1 + 1 + ... + n
// 1000 + 10 = 1010

// n = 100_000
// 1000 + 100_000 = 101_000

// n = 100_000_000
// 1000 + 100_000_000 = 100_001_000

// n = 1_000_000_000
// 1000 + 1_000_000_000 = 1_000_001_000

printNumbers(10);

/* ---------------------------- 2 Time Complexity --------------------------- */
const matrix = [
  [1, 2],
  [3, 5],
];

function sumMatrix(matrixInput: number[][]) {
  let result = 0; // 1 times

  for (let i = 0; i < matrixInput.length; i++) {
    for (let j = 0; j < matrixInput[i].length; j++) {
      result = result + matrixInput[i][j];
    } // n times
  } // n times

  return result; // 1 time
}

// console.log(sumMatrix(matrix));

// 1 + n^2 + 1
// 1 + 1 + n^2
// 2 + n^2
// n^2 -> O(n^2) -> Quadratic

function sumMatrixOptimized(matrixInput: number[][]) {
  const result = matrixInput.flat().reduce((acc, curr) => {
    return acc + curr;
  });
  return result;
}

// console.log(sumMatrixOptimized(matrix));

/* --------------------------- 1 Space Complexity --------------------------- */
function reverseArray(arrayInput: any[]) {
  const name = "Budiman"; // 1
  let reversed: any[] = []; // n
  for (let i = arrayInput.length - 1; i >= 0; i--) {
    reversed.push(arrayInput[i]);
  }
  return reversed;
}

// console.log(reverseArray([1, 2, 3, 4]));

// 1 + n
// n -> O(n) -> linear

function reverseArrayOptimized(arrayInput: any[]) {
  let left = 0;
  let right = arrayInput.length - 1;

  while (left < right) {
    [arrayInput[left], arrayInput[right]] = [
      arrayInput[right],
      arrayInput[left],
    ];
    left++;
    right--;
  }

  return arrayInput;
}

// console.log(reverseArrayOptimized([1, 2, 3, 4, 5]));

/* -------------------------------------------------------------------------- */
/*                             Searching Algorithm                            */
/* -------------------------------------------------------------------------- */
/* ----------------------------- 1 Linear Search ---------------------------- */
function linearSearch(dataCollection: number[], target: number) {
  let result;

  for (let i = 0; i < dataCollection.length; i++) {
    if (dataCollection[i] === target) {
      result = dataCollection[i];
      break;
    }
  }

  if (result) {
    return result;
  } else {
    return -1;
  }
}

// console.log(linearSearch([10, 3, 6, 9, 99], 3));

/* ----------------------------- 2 Binary Search ---------------------------- */
function binarySearch(dataCollection: number[], target: number) {
  let low = 0;
  let high = dataCollection.length - 1;

  while (low <= high) {
    let mid = Math.floor((high + low) / 2);

    if (dataCollection[mid] === target) {
      return mid;
    } else if (dataCollection[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([3, 10, 20, 30, 40], 10));
/* ---------------------------------- NOTES --------------------------------- */
const multiDimensionArr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// console.log(multiDimensionArr[0][0]);

// let score = 100;
// score = score + 1000;
// score += 1000;
// console.log(score);

// console.log(multiDimensionArr.flat());

// const arrayOfNum = [10, 20];
// // const indexOne = arrayOfNum[0];
// // const indexTwo = arrayOfNum[1];
// const [indexOne, indexTwo] = arrayOfNum;
