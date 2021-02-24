'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* -------------------------------------------------------------------------- */
/*                 Display transactions in Movement Container                 */
/* -------------------------------------------------------------------------- */

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, ind) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
            ${ind + 1}. ${type}
        </div>
        <div class="movements__value">
            ${mov}
        </div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/* -------------------------------------------------------------------------- */
/*                              Create username                               */
/* -------------------------------------------------------------------------- */

// Added usernames to account object
const createUsernames = (accs) => {
  accs.forEach((account) => {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map((part) => part[0])
      .join('');
  });
};

createUsernames(accounts);

/* -------------------------------------------------------------------------- */
/*                              Calculate Balance                             */
/* -------------------------------------------------------------------------- */
const calcDisplayBalance = (movements) =>
  movements.reduce((acc, curr) => acc + curr, 0);

labelBalance.textContent = `${calcDisplayBalance(account1.movements)} EUR`;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* -------------------------------------------------------------------------- */
/*                                    Slice                                   */
/* -------------------------------------------------------------------------- */

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); // New Array with copy
console.log(arr.slice(-2));
console.log(arr.slice(2, 4));
console.log(arr.slice(1, -1));
console.log(arr.slice()); // Shallow Copy like spread

/* -------------------------------------------------------------------------- */
/*                                   Splice                                   */
/* -------------------------------------------------------------------------- */
// It changes original Array

console.log(arr.splice(1, 1));
console.log(arr);

// arr.splice(-1) -> To remove last element
// arr.splice(2,2) -> To element at index 2
// arr.splice(2,3) -> Deletes index 2,3
// Includes both indeces unlike slice

/* -------------------------------------------------------------------------- */
/*                                   Reverse                                  */
/* -------------------------------------------------------------------------- */

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // Changes the original Array
console.log(arr2);

/* -------------------------------------------------------------------------- */
/*                                   Concat                                   */
/* -------------------------------------------------------------------------- */

const letters = arr.concat(arr2); // makes a copy
console.log(letters);
console.log(arr); // Doesn't change the original
// Or using spread
console.log([...arr, ...arr2]);

/* -------------------------------------------------------------------------- */
/*                                    Join                                    */
/* -------------------------------------------------------------------------- */
/*
console.log(letters.join('-'));
*/
/* -------------------------------------------------------------------------- */
/*                                  For Each                                  */
/* -------------------------------------------------------------------------- */
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('------------For Of -------------');
// Movement.entries gives [index,value] index can use used to find index
for (const [i, movement] of movements.entries()) {
  // for (const movement of movements) {
  movement > 0
    ? console.log(`${i}. You deposited ${movement}`)
    : console.log(`${i}. You withdrew ${Math.abs(movement)}`);
}

console.log('------------For Each -------------');
// Requires a callback to tell it what to do for each iteration
movements.forEach(function (movement) {
  movement > 0
    ? console.log(`You deposited ${movement}`)
    : console.log(`You withdrew ${Math.abs(movement)}`);
});

// To access index in forEach ->  you can name arguments anything
movements.forEach(function (movement, index, movements) {
  movement > 0
    ? console.log(`${index}. You deposited ${movement}`)
    : console.log(`${index}. You withdrew ${Math.abs(movement)}`);
});
// continue and break statements do not work with forEach

/* -------------------------------------------------------------------------- */
/*                         For Each with Maps and Sets                        */
/* -------------------------------------------------------------------------- */

// Map
const currencies = new Map([
  ['USD', 'United States Dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound Sterling'],
  ['INR', 'Indian Rupee'],
]);

currencies.forEach(function (val, key, map) {
  console.log(`${key} : ${val}`);
});

// Set
const currenciesUnique = new Set(['USD', 'INR', 'INR', 'EUR', 'EUR', 'GBP']);

currenciesUnique.forEach(function (val, key, set) {
  console.log(`${key} : ${val}`); // key and val are same - Done to avoid confusion
});

/* -------------------------------------------------------------------------- */
/*                             Coding Challenge #1                            */
/* -------------------------------------------------------------------------- */

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = (dogsJulia, dogsKate) => {
  const realDogsJulia = dogsJulia.slice(1, -2);
  const dogsArr = [...realDogsJulia, ...dogsKate];
  console.log(dogsArr);
  dogsArr.forEach((dogAge, idx) => {
    dogAge < 3
      ? console.log(`Dog number ${idx} is a puppy`)
      : console.log(`Dog number ${idx} is an adult`);
  });
};

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
checkDogs(dogsJulia, dogsKate);

const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];
checkDogs(dogsJulia2, dogsKate2);

/* -------------------------------------------------------------------------- */
/*                   Map, Filter and Reduce - Array Methods                   */
/* -------------------------------------------------------------------------- */
/*
* Map    -> works like forEach creates a brand new array, after doing 
            operation
* Filter -> Filters array from original array which satisfies a certain condition, 
            returns a new array.
* Reduce -> boils down all elements of array to one single value. 
            (adding all elements)
*/
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Map Method                                 */
/* -------------------------------------------------------------------------- */

const eurToUsd = 1.1;

const movementsUSD = movements.map((mov) => mov * eurToUsd);
console.log(movementsUSD);

const movementsDescription = movements.map((mov, idx) =>
  mov > 0
    ? `${idx + 1}: You Deposited ${mov}`
    : `${idx + 1}: You withdrew ${Math.abs(mov)}`
);
console.log(movementsDescription);

/* -------------------------------------------------------------------------- */
/*                                   Filter                                   */
/* -------------------------------------------------------------------------- */

const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

console.log(deposits);
console.log(withdrawals);

/* -------------------------------------------------------------------------- */
/*                                   Reduce                                   */
/* -------------------------------------------------------------------------- */

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);
const maximum = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(maximum);

/* -------------------------------------------------------------------------- */
/*                             Coding Challenge #2                            */
/* -------------------------------------------------------------------------- */
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calculatedogsHumanAgeAvg = (dogsAge) => {
  return dogsAge
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((avg, el, idx) => (avg * idx + el) / (idx + 1));
};

const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

console.log(calculatedogsHumanAgeAvg(dogsAge1));
console.log(calculatedogsHumanAgeAvg(dogsAge2));
