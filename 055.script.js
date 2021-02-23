'use strict';

/* -------------------------------------------------------------------------- */
/*                             Default Parameters                             */
/* -------------------------------------------------------------------------- */

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES-5 way
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('AE233', 2, 888);
createBooking('AE533', 2);
createBooking('AE273', 5);
createBooking('JY612', undefined, 1000);

/* -------------------------------------------------------------------------- */
/*                              Argument Passing                              */
/* -------------------------------------------------------------------------- */

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 3546235623565,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 3546235623565) {
    console.log('Checked In!!!');
  } else {
    console.log('Wrong Passport');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.floor(Math.random() * 10000000000000);
};

newPassport(jonas);
console.log(jonas);
checkIn(flight, jonas);

/* -------------------------------------------------------------------------- */
/*                           Higher Order Functions                           */
/* -------------------------------------------------------------------------- */

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join();
};

// Higher Order Function
const transformer = function (str, fn) {
  console.log(`Original String:    ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed by:     ${fn.name}`);
};

transformer('Javascript is the best!!', upperFirstWord);
console.log(`***************************************************`);
transformer('Javascript is the best!!', oneWord);

// JS uses Call backs all the time
const high5 = function () {
  console.log('😊');
};

document.body.addEventListener('click', high5);

const someArr = ['Jonas', 'Martha', 'Adam'];
someArr.forEach(high5);

/* -------------------------------------------------------------------------- */
/*                         Function returning function                        */
/* -------------------------------------------------------------------------- */

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Harshit');
greeterHey('Steven');

greet('Hello')('Jonas'); // Useful in Functional Programming.

const greetArw = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArw('Are you seriously working')('Arrow??');

/* -------------------------------------------------------------------------- */
/*                         Call, Apply and Bind Method                        */
/* -------------------------------------------------------------------------- */

const luftansa = {
  airline: 'Luftansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

luftansa.book(456, 'Harshit');
luftansa.book(195, 'Jhanvi');
console.log(luftansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = luftansa.book;
// Does Not work
// book(23, 'Sarah Williams');
// Call Method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(luftansa, 451, 'Mary Cooper');
console.log(luftansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 318, 'Larry Page');
console.log(swiss);

const flightData = [581, 'George Cooper'];
book.apply(swiss, flightData); // or book.call(swiss,...flightData)
console.log(swiss);

// Bind Method
// Call method - book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); // Returns this function pointing to eurowings
const bookLH = book.bind(luftansa);
const bookLX = book.bind(swiss);

bookEW('877', 'Some Binded person');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Anshu Bhan');
bookEW23('Sneha Bhan');

console.log(eurowings);

// With Event Listeners
luftansa.planes = 300;

luftansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

const buyNewPlaneBTN = document.querySelector('.buy');
buyNewPlaneBTN.addEventListener('click', luftansa.buyPlane.bind(luftansa));

// Partial Application
const addTax = (rate, val) => val + (val * rate) / 100;

console.log(addTax(10, 200));

const addVAT = addTax.bind(null, 23);
console.log(addVAT(1000));

const addTax2 = (rate) => {
  return (val) => val + (val * rate) / 100;
};

const addNewTax = addTax2(28);

console.log(addNewTax(1000));

/* -------------------------------------------------------------------------- */
/*                             Coding Challenge #1                            */
/* -------------------------------------------------------------------------- */
/*
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section! answers: new Array(4).fill(0),
};

// Task 1
poll.answers = new Array(4).fill(0);
poll.registerNewAnswer = function () {
  let questionString = `${this.question}\n`;
  for (const option of this.options) {
    questionString += `${option}\n`;
  }
  questionString += `(Write option number)`;
  const option = prompt(questionString);
  const index = parseInt(option);
  if (index < 0 || index > 3) {
    console.log(`Enter correct answer`);
  } else {
    this.answers[index]++;
  }
  this.displayResults();
  this.displayResults('string');
};

// Task 2
const pollBTN = document.querySelector('.poll');
pollBTN.addEventListener('click', poll.registerNewAnswer.bind(poll));

// Task 3
poll.displayResults = function (type = 'array') {
  if (type === 'array') {
    console.log(this.answers);
  } else if (type === 'string') {
    console.log(`Poll Results are ${this.answers.join(', ')}`);
  }
};

const arr2 = [5, 2, 3];
const arr3 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: arr2 }, 'string');
poll.displayResults.call({ answers: arr3 }, 'string');

/* -------------------------------------------------------------------------- */
/*               Immediately Invoked Function Expressions (IIFE)              */
/* -------------------------------------------------------------------------- */
const runOnce = function () {
  console.log('This will never run again');
};

//runOnce();
// IIFE - To use a function only once - useful in Async Await
// To hide variables and scope
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

(() => console.log('IIFE in arrow function'))();

/* -------------------------------------------------------------------------- */
/*                                  Closures                                  */
/* -------------------------------------------------------------------------- */

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers.`);
  };
};

const booker = secureBooking();
booker();
booker();
booker();
booker();

console.dir(booker);

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f();

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are three groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
