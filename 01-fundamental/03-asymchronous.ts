console.log(1);
console.log(2);

// Heavy process
for (let i = 0; i < 1000_000_000; i++) {}

setTimeout(() => {
  console.log("ASYNC!");
}, 1000);

setTimeout(() => {
  console.log("CHRONOUS!");
}, 0);

console.log(3);
console.log(4);
console.log(5);
