/* PSEUDOCODE
1. Buat class dengan nama Employee
  - Properties:
    - Employee name
    - Total working hours
  - Construtor: Untuk memberi nilai awal properties yang ada
  - Method:
    - Add working hours -> Untuk menyimpan lama waktu kerja

2. Buat class FulltimeEmployee yang mewarisi kelas Employee
  - Constructor: panggil fungsi super() untuk mewarisi kelas Employee
  - Method:
    - Calculate salary -> Untuk menghitung total salary
        IF total working hours > 6
          rate/hour = 75_000
        ELSE
          rate/hour = 100_000
        
        total salary = rate/hour * total working hours

        RETURN Total salary

3. Buat class ParttimeEmployee yang mewarisi kelas Employee
  - Constructor: panggil fungsi super() untuk mewarisi kelas Employee
  - Method:
    - Calculate salary -> Untuk menghitung total salary
        IF total working hours > 6
          rate/hour = 30_000
        ELSE
          rate/hour = 50_000
        
        total salary = rate/hour * total working hours

        RETURN Total salary

4. Buat instances/object dari kelas FulltimeEmployee dan ParttimeEmployee
5. Tambah working hour employee dengan memanggil method add working hours
6. Hitung total salary dengan memanggil method calculate total salary dan tampilkan hasilnya
*/

class Employee {
  employeeName: string;
  totalWorkingHours: number;

  constructor(employeeName: string, totalWorkingHours: number) {
    this.employeeName = employeeName;
    this.totalWorkingHours = totalWorkingHours;
  }

  addWorkingHour(hours: number) {
    this.totalWorkingHours = this.totalWorkingHours + hours;
  }
}

class FulltimeEmployee extends Employee {
  constructor(employeeName: string, totalWorkingHours: number) {
    super(employeeName, totalWorkingHours);
  }

  calculateSalary() {
    let payPerHour = 0;

    if (this.totalWorkingHours > 6) {
      payPerHour = 75_000;
    } else {
      payPerHour = 100_000;
    }

    const totalSalary = this.totalWorkingHours * payPerHour;
    return totalSalary;
  }
}

class ParttimeEmployee extends Employee {
  constructor(employeeName: string, totalWorkingHours: number) {
    super(employeeName, totalWorkingHours);
  }

  calculateSalary() {
    let payPerHour = 0;

    if (this.totalWorkingHours > 6) {
      payPerHour = 30_000;
    } else {
      payPerHour = 50_000;
    }

    const totalSalary = this.totalWorkingHours * payPerHour;
    return totalSalary;
  }
}

const zuhri = new FulltimeEmployee("Zuhri", 0);
const aryo = new ParttimeEmployee("Aryo", 0);

// Day 1
zuhri.addWorkingHour(10);
aryo.addWorkingHour(5);

// Day 2
zuhri.addWorkingHour(5);
aryo.addWorkingHour(5);

// Day 3
zuhri.addWorkingHour(5);
aryo.addWorkingHour(10);

console.log(`Zuhri Salary: ${zuhri.calculateSalary()}`);
console.log(`Aryo Salary: ${aryo.calculateSalary()}`);
