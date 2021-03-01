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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? [...movements].sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, ind) {
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
const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance}€`;
};

/* -------------------------------------------------------------------------- */
/*                              Calculate Summary                             */
/* -------------------------------------------------------------------------- */
const calcDisplaySummary = (account) => {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = incomes + '€';

  const expenses = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = expenses + '€';

  const interest = account.interestRate;
  const totalInterest = account.movements
    .filter((mov) => mov > 0)
    .map((dep) => dep * (interest / 100))
    .filter((val) => val >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = totalInterest + '€';
};

/* -------------------------------------------------------------------------- */
/*                                  Update UI                                 */
/* -------------------------------------------------------------------------- */

const updateUI = (account) => {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display Summary
  calcDisplaySummary(account);
};

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
let currentAccount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Login');
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = '';
    updateUI(currentAccount);
  }
});

/* -------------------------------------------------------------------------- */
/*                            Implementing Transfer                           */
/* -------------------------------------------------------------------------- */
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log('Invalid Transfer');
  }
});

/* -------------------------------------------------------------------------- */
/*                               Requesting Loan                              */
/* -------------------------------------------------------------------------- */
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add to the movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('Loan not sanctioned');
  }
});

/* -------------------------------------------------------------------------- */
/*                                Close Account                               */
/* -------------------------------------------------------------------------- */
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('Correct details');
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    // Delete Account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Incorrect Details');
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
let sorted = false;
/* -------------------------------------------------------------------------- */
/*                                 Sort Button                                */
/* -------------------------------------------------------------------------- */

btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

console.log('============================ 25th ============================');

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// Already done that way.

/* -------------------------------------------------------------------------- */
/*                                 Find Method                                */
/* -------------------------------------------------------------------------- */

// Returns firts element that satisfies this condition
const firstWithd = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithd);

console.log(accounts);
const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account);

/* -------------------------------------------------------------------------- */
/*                               Some and Every                               */
/* -------------------------------------------------------------------------- */

console.log(movements);

// Equality
console.log(movements.includes(-130)); // returns true if exactly equal

// Some Condition
console.log(movements.some((mov) => mov === -130));
// if there are any deposits in this account
console.log(movements.some((mov) => mov > 5000));

// Every -> Checks on all elements
console.log(account4.movements.every((mov) => mov > 0));

// Seperate Callback
const depositsFunc = (mov) => mov > 0;

console.log(account4.movements.every(depositsFunc));
console.log(movements.filter(depositsFunc));

/* -------------------------------------------------------------------------- */
/*                               Flat & Flat Map                              */
/* -------------------------------------------------------------------------- */

const arrr = [[1, 2, 3], [4, 5, 6], 7, 8, [9, 10]];

// Goes only one level deep
console.log(arrr.flat()); // prints [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const arrr2 = [[1, [2, 3]], [4, 5, 6], 7, 8, [[9], 10]];
console.log(arrr2.flat()); // prints [1, Array(2), 4, 5, 6, 7, 8, Array(1), 10]

console.log(arrr2.flat(2)); // Goes to 2 level Deep

const accountsMovements = accounts.map((acc) => acc.movements);
console.log(accountsMovements);

const allMovements = accountsMovements.flat();
console.log(allMovements);
const overAllBalance = allMovements.reduce((acc, mov) => acc + mov);
console.log(overAllBalance);

const overAllBalance2 = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overAllBalance2);
// FlatMap combines the operations of line 546 and 547

/* -------------------------------------------------------------------------- */
/*                                   Sorting                                  */
/* -------------------------------------------------------------------------- */

// Strings
const owners = ['Joanas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
console.log(movements.sort()); // Not desired - it convers to strings and then sorts

//Can be rectified  via callbacks
// return < 0 -> a b (keep order)
// return > 0 -> b a (switch the order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (b > a) {
//     return -1;
//   }
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   }
//   if (b > a) {
//     return 1;
//   }
// });
movements.sort((a, b) => b - a);
console.log(movements);

/* -------------------------------------------------------------------------- */
/*                 more ways of creting array and fill method                 */
/* -------------------------------------------------------------------------- */

console.log([1, 2, 3, 4, 5]);
console.log(new Array(1, 2, 3, 4, 5, 6));

const x = new Array(7); // Creates Array of length 7 rather than one element of 7 array
// x.fill(1); // Makes 1 at every place
// x.fill(2, 3); // Starts filling from index 3
// x.fill(4, 3, 5); // Fills from index 3 to 5 with 4
console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 33);
console.log(y);

const z = Array.from({ length: 9 }, (_, i) => i + 1);
console.log(z);

const hundredDiceRolls = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);

console.log(hundredDiceRolls);

labelBalance.addEventListener('click', (e) => {
  const movements_UI = Array.from(
    document.querySelectorAll('.movements__value'),
    (elem) => Number(elem.textContent.replace('€', ''))
  );

  console.log(movements_UI);
});

/* -------------------------------------------------------------------------- */
/*                           Array Methods Practice                           */
/* -------------------------------------------------------------------------- */

// 1.
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits9, withdrawals9 } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits9, withdrawals9);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/* -------------------------------------------------------------------------- */
/*                             Coding Challenge #4                            */
/* -------------------------------------------------------------------------- */

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Task 1
for (const dog of dogs) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
}

console.log(dogs);

// Task 2
for (const dog of dogs) {
  let intake = ``;
  if (dog.owners.includes('Sarah')) {
    const limitOver = dog.recommendedFood * 1.1;
    const limitLess = dog.recommendedFood * 0.9;
    if (limitLess > dog.curFood) {
      intake += `too less`;
    } else if (limitOver < dog.curFood) {
      intake += `too much`;
    } else {
      intake += `perfectly`;
    }
    console.log(`Sarah's dog is eating ${intake}`);
  }
}

// Task 3

const ownersEatTooLittle = dogs
  .filter((dog) => dog.recommendedFood * 0.9 > dog.curFood)
  .map((dog) => dog.owners)
  .flat();

console.log(ownersEatTooLittle);

const ownersEatTooMuch = dogs
  .filter((dog) => dog.recommendedFood * 1.1 < dog.curFood)
  .map((dog) => dog.owners)
  .flat();

console.log(ownersEatTooMuch);

// Task 4

let tooLittleString = ``;
for (let i = 0; i < ownersEatTooLittle.length - 1; i++) {
  tooLittleString += `${ownersEatTooLittle[i]} and `;
}

tooLittleString += `${
  ownersEatTooLittle[ownersEatTooLittle.length - 1]
}'s dog eat too little.`;

let tooMuchString = ``;
for (let i = 0; i < ownersEatTooMuch.length - 1; i++) {
  tooMuchString += `${ownersEatTooMuch[i]} and `;
}

tooMuchString += `${
  ownersEatTooMuch[ownersEatTooMuch.length - 1]
}'s dog eat too much.`;

console.log(tooLittleString, tooMuchString);

// Task 5
console.log(
  dogs.filter((dog) => dog.recommendedFood === dog.curFood).length > 0
);

// Task 6

console.log(
  dogs.filter(
    (dog) =>
      dog.curFood <= dog.recommendedFood * 1.1 &&
      dog.curFood >= dog.recommendedFood * 0.9
  ).length > 0
);

// Task 7
const dogsEatingFine = dogs.filter(
  (dog) =>
    dog.curFood <= dog.recommendedFood * 1.1 &&
    dog.curFood >= dog.recommendedFood * 0.9
);

console.log(dogsEatingFine);

// Task 8
const dogsSorted = [...dogs].sort(
  (a, b) => a.recommendedFood - b.recommendedFood
);

console.log(dogsSorted);
