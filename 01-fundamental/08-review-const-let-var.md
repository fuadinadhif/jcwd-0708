# REVIEW CONST, LET, VAR

`const`, `let`, `var` kita pakai untuk membuat sebuah variable

## Apa itu variable?

Tempat untuk menyimpan data

```js
10;
("Hello");

console.log("Selamat pagi");
```

```js
let age = 10;
const greeting = "Hello";
var name = "Andre";

console.log(age);
console.log(greeting);
```

## CONST VS LET

`const` -> Tidak bisa diisi ulang (re-assign)
`let` -> Bisa diisi ulang (re-assign)

```js
const colorMode = "dark";
colorMode = "light"; // ❌ re-assign

let score = 1000;
score = 10; // ✅ re-assign
```
