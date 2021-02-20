'use strict';

////////////////// Default Parameters //////////////////

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

////////////////// Argument Passing //////////////////

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

////////////////// Higher Order Functions //////////////////

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

////////////////// Function returning function //////////////////

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
