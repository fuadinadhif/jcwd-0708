/* ------------------------------------ 1 ----------------------------------- */
class Car {
  brand: string;
  year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }

  start() {
    console.log("Car started");
  }
}

const myCar = new Car("Mazda", 2024);
// console.log(myCar.year);
// console.log(myCar.brand);
// myCar.start();

/* ------------------------------------ 2 ----------------------------------- */
// Encapsulation
class User {
  username: string; // public property
  #password: string; // private property

  constructor(username: string, password: string) {
    this.username = username;
    this.#password = password;
  }

  checkPassword(input: string): string {
    if (input === this.#password) {
      return "Password matched!";
    } else {
      return "Wrong password";
    }
  }
}

// const user = new User("johndoe", "superdupersecurepassword");
// console.log(user.checkPassword("12345")); // Wrong password
// console.log(user.checkPassword("superdupersecurepassword")); // Password matched!
// console.log(user.password); // undefined
// console.log(user.username); // johndoe

/* ------------------------------------ 3 ----------------------------------- */
// Inheritance + Polymorphism
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

class Employee extends Person {
  jobTitle: string;

  constructor(name: string, jobTitle: string) {
    super(name);
    this.jobTitle = jobTitle;
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I work as a ${this.jobTitle}`;
  }
}

const alicePerson = new Person("Alice");
const bobEmployee = new Employee("Bob", "Software Engineer");

// console.log(alicePerson.greet());
// console.log(bobEmployee.greet());

/* -------------------------------------------------------------------------- */
/*                                    NOTES                                   */
/* -------------------------------------------------------------------------- */
/* -------------------- Implicit VS Explicit Annotations -------------------- */
const score = 5000; // -> type = number -> Implicit
const point: number = 100; // -> type = number -> Explicit

class Parent {
  name: string;

  constructor(name = "Zulfikar") {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

class Children extends Parent {
  constructor(name) {
    super(name);
  }
}

const parent1Obj = new Parent();
const parent2Obj = new Parent("Abdi");
const childrenObj = new Children("Kayla");

console.log("Parent1: " + parent1Obj.name);
console.log("Parent2: " + parent2Obj.name);
console.log("Children: " + childrenObj.name);
