const arrayInput = [
  { name: "David", age: 20 },
  { name: "Budiman", age: 70 },
];

function reverseKeysAndValues(inputArray) {
  const result = inputArray.map((element) => {
    const reversedObj = {};

    for (const key in element) {
      const value = element[key];
      reversedObj[value] = key;
    }

    return reversedObj;
  });

  return result;
}

console.log(reverseKeysAndValues(arrayInput));

/* --------------------------------- REVIEW --------------------------------- */
const studentObj = {};

console.log(studentObj);

// dot notation
// studentObj.name = "Joko Anwar";
// square bracket notation
// studentObj["age"] = 70;

// console.log(studentObj);

for (const key in studentObj) {
  console.log(key);
}

const arrayOfNums = [1, 2, 3];
const mapResult = arrayOfNums.map((element) => {});

console.log(mapResult);
