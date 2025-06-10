# REVIEW ARRAY METHOD

## .filter()

```js
const arrayOfNum = ["Unos", "Des", "Tres"];
arrayOfNum.filter((element, index, array) => {});
```

- Tujuan: Membuat Array baru dari element Array lama yang lolos `callback function test` yang kita buat
- Parameter callback:
  - element: Value dari element array yang sedang diproses
  - index: Nomor index dari element arrray yang sedang diproses
  - array: Array yang sedang diproses
- Return: Array baru dari hasil filter
- Cara kerja:
  1. Filter method akan melakukan loop
  2. Di setiap loopnya dia akan menjalankan callback function yang sudah dibuat
  3. Kalau callback function-nya mengembalikan (return) true -> element akan disimpan di array baru
  4. Kalau callback function-nya mengembalikan (return) false -> element akan dibuang

```json
const studentData = [
  {name: "Andhika", status: "active"},
  {name: "Giri", status: "inactive"},
  {name: "Dhomas", status: "active"},
  {name: "Luthi", status: "inactive"},
  {name: "Budiman", status: "active"},
]

const activeStudentData = studentData.filter((element) => {
  if (element.status === "active") {
    return true;
  } else {
    return false;
  }
})

const activeStudentData = studentData.filter((element) => element.status === "active")
```

## .map()

```js
const arrayOfNum = ["Unos", "Des", "Tres"];
arrayOfNum.map((element, index, array) => {});
```

- Tujuan: Membuat array baru dari element Array lama yang sudah dimodifikasi sesusai callback function yang kita buat
- Parameter callback: Sama dengan .filter() method
- Return: Array baru yang panjangnya sama dengan array lama
- Cara kerja:
  1. Map method melakukan loop
  2. Di setiap loopnya dia akan menjalankan callback function yang sudah dibuat
  3. Apapun yang direturn oleh callback function akan menjadi value di array baru

```js
const arrayOfNames = ["Sudrajat", "Dana", "Rizal", "Boncel"];
const hiArrayNames = arrayOfNames.map((element) => {
  return "Hi " + element;
});

console.log(hiArrayNames);
```

```js
const employeeData = [
  { name: "Angelina", position: "Manager", salary: 50000 },
  { name: "Budiman", position: "CTO", salary: 150000 },
  { name: "Andi", position: "VP", salary: 450000 },
  { name: "Jokowi", position: "Head Manager", salary: 1000 },
  { name: "Prabowo", position: "Tech Lead", salary: 5000 },
];

const htmlResult = employeeData.map((element) => {
  return `<div>
      <p>name: ${element.name}</p>
      <p>position: ${element.position}</p>
      <p>salary: ${element.salary}</p>
    </div>`;
});
```

## .reduce()

```js
const arrayOfScore = [100, 200, 300];
arrayOfScore.reduce((accumulator, current, index, array) => {});
```

- Tujuan: Mereduksi sebuah array menjadi satu value saja
- Parameter:
  - accumulator:
    1. Di loop pertama berisi initial value jika initial value ada
    2. Di loop pertama berisi Array[0] jika initial value tidak ada
    3. Di loop berikutnya berisi hasil return callback function
  - current: Element yang sedang diproses
  - index: Sama dengan .map()/.filter()
  - array: Sama dengan .map()/.filter()
- Return: Satu jenis value
- Cara kerja:
  1. Reduce method menjalankan loop
  2. Apakah ada initial value? Jika ada masukkan initial value ke accumulator jika tidak gunakan Array[0] sebagai nilai accumulator
  3. Jalankan callback function
  4. Simpan hasil callback function ke dalam accumulator

```js
const arrayOfScores = [10, 5, 8, 7];
const totalScore = arrayOfScores.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(totalScore);
```

## .unshift()/.shift()/.pop()/.push()

Method yang kita gunakan untuk menambah/mengurangi element dari suatu Array

1. unshift -> Menambahkan element baru di depan array
2. shift -> Mengurangi element dari depan array
3. push -> Menambahkan element baru di belakang array
4. pop -> Mengurangi element dari belakang array
