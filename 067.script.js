'use strict';

/* -------------------------------------------------------------------------- */
/*             Constructor Function - Not a feature of JS language            */
/* -------------------------------------------------------------------------- */

// 1. New {} empty object is created
// 2. function is called,this = {}
// 3. {} is linked to a prototype
// 4. function automatically returns {}

// Arrow function does not work as not this keyword
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never Do this => use prototypes
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const harshit = new Person('Harshit', 1995);
const jhanvi = new Person('Jhanvi', 1999);

console.log(harshit, jhanvi);
console.log(jonas instanceof Person);

/* -------------------------------------------------------------------------- */
/*                                 Prototypes                                 */
/* -------------------------------------------------------------------------- */

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

harshit.calcAge(); // Not added on object. but have access to these methods
// Because object always has access to its prototype
jhanvi.calcAge();

// TO access prototype:
console.log(harshit.__proto__); // Returns {calcAge: ƒ, constructor: ƒ}
console.log(Person.prototype);
console.log(harshit.__proto__ === Person.prototype); // Returns True

console.log(Person.prototype.isPrototypeOf(jhanvi)); // Returns True
console.log(Person.prototype.isPrototypeOf(Person)); // Returns False

Person.prototype.species = 'Homo Sapiens'; // setting the property

console.log(harshit);

console.log(harshit.hasOwnProperty('firstName')); // True
console.log(harshit.hasOwnProperty('species')); // False

console.log(harshit.__proto__);
//Object.prototype
console.log(harshit.__proto__.__proto__);
console.log(harshit.__proto__.__proto__.__proto__); // Returns Null

console.dir(Person.prototype.constructor);

const arr = [4, 7, 2, 5, 8, 9, 1, 1, 1, 2, 2];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// Not a good idea to use protype on builtin Objects
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

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
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();

mercedes.brake();
mercedes.brake();
mercedes.brake();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();

/* -------------------------------------------------------------------------- */
/*                                ES 6 Classes                                */
/* -------------------------------------------------------------------------- */

// Class Expression
const PersonCl1 = class {};

// Class Decleration
class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // Automatically added to prototype property
  calcAge() {
    console.log(2021 - this.birthYear);
  }
}

const musu = new Person('Muskan', 2000);
console.log(musu);
musu.calcAge();

// 1. Classes are NOT hoisted.
// 2. Classes are firstClass citizens
// 3. Classes are executed in Strict Mode
