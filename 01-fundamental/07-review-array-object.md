# REVIEW ARRAY OBJECT

## Apa itu Array?

**Array** adalah **kumpulan data** yang **tersusun secara berurutan** dan setiap item memiliki nomor indeks mulai dari 0

Gunakan Array jika:

1. Kita punya banyak data yang **sejenis**

   ```js
   const studentName = ["Dhira", "Imel", "Naja"];
   const studentScore = [90, 95, 100];
   ```

2. Ketika **urutan** data menjadi penting

   ```js
   const playlist = ["Tak ada yang abadi", "My Way", "Back to Black"];
   ```

3. Ketika kita ingin melakukan looping

   ```js
   const score1 = 90;
   const score2 = 100;
   const score3 = 1000;

   const scores = [90, 100, 1000];
   ```

---

## Apa itu Object?

**Object** adalah **kumpulan data** yang berpasangan (key dan value). Kita pakai untuk menyimpan beberapa data yang **saling berhubungan.**

Gunakan object ketika:

1. Kita ingin menyimpan berbagai data tentang suatu hal

   ```js
   const customerName = "Andhika";
   const customerAge = 29;
   const customerAddress = "Jl. Asia Afrika";

   const customerData = {
    name: "Andhika",
    age: 29
    address: "Jl. Asia Afrika"
   }
   ```

2. Kita ingin memberi label dari sebuah data

   ```js
   const unemploymentRate1 = "10%";
   const unemploymentRate2 = "5%";
   const unemploymentRate3 = "1%";

   const indonesiaUnemploymentRate: {
    2017: "10%",
    2018: "5%",
    2019: "1%"
   }
   ```

3. Ketika kita tidak peduli dengan urutan data

## Kapan Menggunakan Object Bersama dengan Array?

Ketika kita punya data yang kompleks kadang kita butuh menggunakan keduanya. Contoh: Kita punya daftar customer, setiap customer punya nama, umur, dan alamat

```js
const customer1 = { name: "Deddy", age: 45, address: "Jawa Barat" };
const customer2 = { name: "Mahendra", age: 50, address: "Jakarta" };
const customer3 = { name: "Desta", age: 35, address: "Bekasi" };

const customerData = [
  { name: "Deddy", age: 45, address: "Jawa Barat" },
  { name: "Mahendra", age: 50, address: "Jakarta" },
  { name: "Desta", age: 35, address: "Bekasi" },
];

for (let i = 0; i < customerData.length; i++>) {
  // ...
}
```

## Tabel Perbandingan

| Situasi                                | Tipe Data | Alasan                                |
| -------------------------------------- | --------- | ------------------------------------- |
| Daftar belanja/daftar tugas/nama siswa | Array     | Butuh uratan dan tipe datanya sejenis |

```js
const groceryList = ["Telur", "Beras", "Sayur", "Minyak"];
const groceryList = ["Matematika", "Sains", "B.Indo"];

const groceryListData = [
  { name: "Telur", amount: 50 },
  { name: "Beras", amount: 100 },
];
```
