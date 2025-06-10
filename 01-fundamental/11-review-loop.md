# REVIEW LOOP

1. For let
2. For of
3. For in
4. While
5. Do While

## FOR LET

```js
for (let i = 0; i < 10; i++) {
  // ...
}

const array = [10, 50, 100, 1000];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
  for (let j = 0; i < array.length; i++) {
    // ...
  }
}
```

## FOR OF -> Loop over iterable variable

```js
const arrayOfCorruptors = ["Nazaruddin", "Batubara", "Setya Novanto", "Sultan"];
for (let el of arrayOfCorruptors) {
  console.log(el);
}
```

## FOR IN -> Loop over enumerable variable

```js
const arrayOfCorruptors = ["Nazaruddin", "Batubara", "Setya Novanto", "Sultan"];
for (let index in arrayOfCorruptors) {
  console.log(index);
}

const peopleData = {
  name: "Muzdalifah",
  age: 50,
  address: "Surabaya",
};

for (let key in peopleData) {
  console.log(key);
}
```
