const myPromise = new Promise((resolve, reject) => {
  if (true) {
    return resolve("Promise resolve");
  } else {
    return reject("Promise rejected");
  }
});

// 1. Dot then
// myPromise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Promise finished!");
//   });

// 2. Async/Await
// async function getMyPromise() {
//   try {
//     console.log(await myPromise);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("Promise finished!");
//   }
// }

// getMyPromise();

// 3. Real Case
// 3.1 Dot then
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// 3.2 Async/Await
async function getUserData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getUserData();
/* ---------------------------------- NOTE ---------------------------------- */
// const date = new Date();
// const error = new Error();

// const arrayNum = [1, 2, 3];
// arrayNum.map((item, index) => {});

// npm install -g tsx
// npm list -g

// 1.
// console.log(fetch("https://jsonplaceholder.typicode.com/users"));
// 2.
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
