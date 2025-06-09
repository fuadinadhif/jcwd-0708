function greetings(param1: () => void, param2: () => void): void {
  param1();
  param2();
}

function sayHi() {
  console.log("Hi");
}

function sayHello() {
  console.log("Hello");
}

// 1.
greetings(sayHi, sayHello);
// 2.
greetings(
  () => console.log("Salam"),
  () => console.log("Punten")
);
// 3.
greetings(
  function sayOke() {
    console.log("Oke");
  },
  function sayGood() {
    console.log("Good");
  }
);

/* ---------------------------------- NOTES --------------------------------- */
// () => void
// function sayHi() {}

// () => string
// function sayHello() {
//   return "Hello";
// }

const array = [1, 2, 3];
array.map(() => {});
