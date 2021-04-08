'use strict';

/* -------------------------------------------------------------------------- */
/*                            Constructor Functions                           */
/* -------------------------------------------------------------------------- */

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Methods -- Bad Practice - Dont create inside of constructor function - use prototype instead
  //   this.calcAge = function () {
  //     return 2021 - this.birthYear;
  //   };
};
// Arrow function will not work as it does not have its own this method

// Static Method
Person.hey = function () {
  console.log(`Hey There 😃`);
  console.log(this);
};

Person.hey();

const jonas = new Person('Jonas', 1991);

// 1. A new empty object is created.
// 2. Function is called and this will point to new object created.
// 3. Newly created object is linked to a prototype
// 4. Function automatically returns the object created at start

console.log(jonas);

const harshit = new Person('Harshit', 1995);
const anshu = new Person('Anshu', 1995);

// We didn't technically created a class, we created object from constructor functions
// But Jonas is an  instance of Person

console.log(harshit instanceof Person);

/* -------------------------------------------------------------------------- */
/*                                 Prototypes                                 */
/* -------------------------------------------------------------------------- */

// All objects defined with this constructor function, will have this property
Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

jonas.calcAge();
harshit.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log('-------------------------------------------');
console.log(Person.prototype.isPrototypeOf(jonas)); // True
console.log(Person.prototype.isPrototypeOf(Person)); // False
console.log(Object.prototype.isPrototypeOf(Person)); // True
console.log('-------------------------------------------');
// should be prototypeOfLinkedObject instead of prototype

Person.prototype.species = 'Homo Sapiens'; // Not in object, but gets inherited.
console.log(jonas.species, harshit.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__); // Of Person
console.log(jonas.__proto__.__proto__); // Of Object
console.log(jonas.__proto__.__proto__.__proto__); // Null

const arr = [1, 3, 3, 1, 2, 4, 3, 2, 1, 1, 4, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // True

console.log(arr.__proto__.__proto__); // Object
console.log(arr.__proto__.__proto__.__proto__); // Null

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); // Not a good idea to add prototype in built in method

const h1 = document.querySelector('h1');
console.dir(h1);

console.log(h1.__proto__); // HTML Heading Element
console.log(h1.__proto__.__proto__); // HTML Element
console.log(h1.__proto__.__proto__.__proto__); // Element
console.log(h1.__proto__.__proto__.__proto__.__proto__); // Node
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__); // Event Targer
console.log(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); // Object

/* -------------------------------------------------------------------------- */
/*                             Coding Challenge #1                            */
/* -------------------------------------------------------------------------- */

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// Task 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// Task 2
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`Current speed of ${this.make} is: ${this.speed}`);
};

// Task 3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`Current speed of ${this.make} is: ${this.speed}`);
};

// Task 4
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.brake();
bmw.brake();
bmw.brake();

mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();

console.log(' ==================== ES 6 ====================');
/* -------------------------------------------------------------------------- */
/*                                ES 6 Classes                                */
/* -------------------------------------------------------------------------- */

// Class Decleration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2021 - this.birthYear);
  } // Added to Prototype

  // Setters and Getters
  get age() {
    return 2021 - this.birthYear;
  }

  // Static Method
  static hey() {
    console.log(`Hey There 😃`);
  }
}

const jessica = new PersonCl('Jessica', 1992);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

PersonCl.hey();

// Classes are not hoisted. - Must be declared first
// Classes are also first class citizens. - Pass and return from functions
// Classes are executed in strict mode.

const account = {
  owner: 'Jonas',
  movements: [100, 200, 300, 400],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;

console.log(account.movements);

console.log(jessica.age);

/* -------------------------------------------------------------------------- */
/*                                Object.create                               */
/* -------------------------------------------------------------------------- */

const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
};

const steven = Object.create(PersonProto);
