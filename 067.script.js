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

// TO access prototype:
console.log(harshit.__proto__); // Returns {calcAge: ƒ, constructor: ƒ}
console.log(Person.prototype);
console.log(harshit.__proto__ === Person.prototype); // Returns True

console.log(Person.prototype.isPrototypeOf(jhanvi)); // Returns True
console.log(Person.prototype.isPrototypeOf(Person)); // Returns False
