# REVIEW OBJECT METHOD

## Object.keys()

- Tujuan: Mendapatkan array berisi semua key dari suatu object
- Return: Sebuah array dengan kumpulan name key

```js
const carData= {
  brand: "Toyota",
  type: "4WD",
  price: 5000000000
  year: 2020
}

const carDataKeys = Object.keys(carData) // ["brand", "type", "price", "year"]
```

## Object.values()

- Tujuan: Mendapatkan array berisi semua value dari suatu object
- Return: Sebuah array dengan kumpulan nilai value

```js
const carData= {
  brand: "Toyota",
  type: "4WD",
  price: 5000000000
  year: 2020
}

const carDataKeys = Object.values(carData) // ["Toyota", "4WD", 500000000, 2020]
```

## Object.entries()

- Tujuan: Mendapatkan array yang berisi value dan key dari suatu object. Array-nya berbentuk dua dimensi
- Return: Array 2 dimensi berisikan key dan value suatu object

```js
const carData= {
  brand: "Toyota",
  type: "4WD",
  price: 5000000000
  year: 2020
}

const carDataKeys = Object.entries(carData) // [["brand", "Toyota"], ["type": "4WD"], ["price", 500000000], ["year", 2020]]
```
