interface StudentData {
  name: string;
  email: string;
}

const array1 = [
  { name: "Student 1", email: "student1@mail.com" },
  { name: "Student 2", email: "student2@mail.com" },
];

const array2 = [
  { name: "Student 1", email: "student1@mail.com" },
  { name: "Student 3", email: "student3@mail.com" },
];

function mergeAndRemoveDuplicate(
  firstArray: StudentData[],
  secondArray: StudentData[]
) {
  const result = [...firstArray]; // spread

  for (const secArrayElement of secondArray) {
    const isDuplicate = result.some((resultArrayElement) => {
      return resultArrayElement.email === secArrayElement.email;
    });

    if (isDuplicate) {
      continue;
    }

    result.push(secArrayElement);
  }

  return result;
}

console.log(mergeAndRemoveDuplicate(array1, array2));

/* ---------------------------------- NOTES --------------------------------- */
// DRY -> Don't Repeat Yourself
