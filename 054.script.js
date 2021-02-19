'use strict';

// Data needed for first part of the section
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 0, mainIndex = 0, time, address }) {
    const ans = `Order Received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} at ${time}`;
    console.log(ans);
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
  // ES6 Enhanced object literal
  openingHours,
};

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//  🔴
const info = flights.split('+');
for (const detail of info) {
  const infoAboutFlight = detail.split(';');
  let ans = `🔴 `;
  const status = infoAboutFlight[0].split('_');
  for (const info of status) {
    if (info != '') {
      ans += info + ' ';
    }
  }
  ans += `from ${infoAboutFlight[1]
    .slice(0, 3)
    .toUpperCase()} to ${infoAboutFlight[2].slice(0, 3).toUpperCase()}`;
  const time = infoAboutFlight[3].split(':');
  ans += ` (${time[0]}h${time[1]})`;
  console.log(ans);
}

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// Solution to Coding challenge 4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textarea = document.querySelector('textarea');

textarea.placeholder = 'Enter your text here';
btn.style.width = '200px';
btn.style.height = '50px';
btn.innerText = 'Change Case';

const underscoreToCamelCase = (data) => {
  console.log(data);
  const strs = data.split('\n');
  let k = 1;
  for (let str of strs) {
    str = str.toLowerCase().trim();
    const temp = str.split('_');
    for (let i = 1; i < temp.length; i++) {
      let tempStr = temp[i];
      tempStr = tempStr[0].toUpperCase() + tempStr.slice(1);
      temp[i] = tempStr;
    }
    console.log(temp.join('').padEnd(20, ' ') + '✅'.repeat(k));
    k++;
  }
};

btn.addEventListener('click', (e) => {
  const data = textarea.value;
  underscoreToCamelCase(data);
});

///////////////// Strings - Part 3 /////////////////
const airline = 'TAP Air Portugal';
console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'Harshit Bhat'.split(' ');
console.log(firstName, lastName);

const names = ['Mr.', firstName, lastName];
const newName = names.join(' ');

const capitalizeName = (name) => {
  const names = name.split(' ');
  const ans = [];
  for (let person of names) {
    ans.push(person[0].toUpperCase() + person.slice(1));
    // Other Way
    // ans.push(person.replace(person[0], person[0].toUpperCase()));
  }
  return ans.join(' ');
};

const passenger = 'jessica ann smith davis';
const myName = 'harshit bhat';

console.log(capitalizeName(passenger));
console.log(capitalizeName(myName));

const message = 'Go to gate 23!!';

console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = (number) => {
  const str = number + '';
  return str.slice(-4).padStart(str.length, '*');
};

console.log(maskCreditCard(324652625625626));

// Repeat Method

const message5 = 'Bad Weather .... All Departures delayed';
console.log(message5.repeat(10));

///////////////// Strings - Part 2 /////////////////
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Capitalisation in name
const passenger9 = 'jOnAs';
const passengerLower = passenger9.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing Email
const email = 'hello@jonas.io';
const loginEmail = '  HeLLo@JoNaS.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
console.log(email === loginEmail.toLowerCase().trim());

// Replacing

const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = `All passengers come to boarding door 23. Boarding door 23!`;
//console.log(announcement.replace('door', 'gate')); // No function replaceAll - Can be done with Regex

console.log(announcement.replace(/door/g, 'gate'));

// Return Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log(`It is a new Airbus Plane.`);
}

const checkBaggage = (items) => {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log(`You are not allowed on the plane`);
  } else {
    console.log(`You are allowed on the plane.`);
  }
};

checkBaggage('I have a laptop, some food, a pocket Knife.');
checkBaggage('I have a socks and camera');
checkBaggage('I have a snacks and Gun for protection');

///////////////// Strings - Part 1 /////////////////
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // Starts at 4 and ends at 7-1 i.e 4,5,6.

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = (seat) => {
  if (seat.slice(-1) === 'B' || seat.slice(-1) === 'E') {
    console.log(`It is a middle seat`);
  } else {
    console.log(`Not a middle seat`);
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Task 1

const eventSet = new Set(gameEvents.values());
const events = [...eventSet.values()];
console.log(events);

// Task 2

gameEvents.delete(64);
console.log(gameEvents);

// Task 3
console.log(
  `An event happened, on average, every ${90 / (gameEvents.size - 1)} minutes`
);

// Task 4

for (const [time, event] of gameEvents) {
  let ans = ``;
  time <= 45 ? (ans += `[FIRST HALF] `) : (ans += `[SECOND HALF] `);
  ans += `${time}: ${event}`;
  console.log(ans);
}

///////////////// Map /////////////////

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Python'],
  [4, 'Javascript'],
  ['correct', 4],
  [true, 'Correct'],
  [false, 'Try Again'],
]);

console.log(question);

// Convert Object to Map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
// Iteration on map
for (const [key, val] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key} : ${val}`);
  }
}

const answer = Number(prompt('Your answer'));

console.log(question.get(answer === question.get('correct')));

///////////////// Map: Fundamental /////////////////

const rest = new Map();
rest.set('name', 'Dominoes');
rest.set(1, 'Canal Road');
rest.set(2, 'Jewel'); // Setting also returns the map. Allows us to chain

rest
  .set('categories', [
    'Veg Pizza',
    'Non Veg Pizza',
    'Desert',
    'Pizza Mania',
    'Starters',
  ])
  .set('open', 11)
  .set('close', 22)
  .set(true, 'We are Open')
  .set(false, 'We are close');

console.log(rest);
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);

const checkArr = [1, 2];
rest.set(checkArr, 'Array Key');

console.log(rest.get(checkArr));

rest.set(document.querySelector('h1'), 'Heading');

console.log(rest);
console.log(rest.size);

///////////////// Sets /////////////////
// Cannot have duplicates

const food = ['Pizza', 'Burger', 'Pasta', 'Pizza', 'Burger', 'Pizza'];
const ordersSet = new Set(food); // Pass an iterable

console.log(ordersSet);
console.log(new Set('Harshit'));

// Size
console.log(ordersSet.size);

// An element present
console.log(ordersSet.has('Bread')); // False
console.log(ordersSet.has('Pizza')); // True

// Adding
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');

// Deleting
ordersSet.delete('Pasta');
console.log(ordersSet);

// To delete all
//ordersSet.clear();

// Iterating over Set
for (const order of ordersSet) {
  console.log(order);
}

///////////////// COding Challenge #2 /////////////////
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...playerNames) {
    for (let i = 0; i < playerNames.length; i++) {
      let goals = 0;
      for (let j = 0; j < this.scored.length; j++) {
        if (this.scored[j] === playerNames[i]) {
          goals++;
        }
      }
      console.log(`${playerNames[i]} scored ${goals} goals.`);
    }
  },
};
// Task 1
for (let [i, player] of game.scored.entries()) {
  console.log(`Goal ${i}: ${player}`);
}
// Task 2
let avg = 0;
for (const val of Object.values(game.odds)) {
  avg += val;
}
console.log(`Average odd is ${avg / Object.values(game.odds).length}`);

// Task 3
for (const [team, odd] of Object.entries(game.odds)) {
  if (team === 'x') {
    console.log(`Odd of draw: ${odd}`);
  } else {
    console.log(`Odd of victory ${game[team]} : ${odd}`);
  }
}

// Task 4
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

///////////////// Looping over Objects /////////////////
const properties = Object.keys(openingHours);

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day} `;
}
console.log(openStr);

// Property Values
const values = Object.values(openingHours);
// console.log(values);

const entries = Object.entries(openingHours);
// console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open} and close at ${close}`);
}

///////////////// Optional Chaining /////////////////
// console.log(restaurant.openingHours.mon.open);
// Error as .mon is undefined and .open of undefined doesn't exists
// We can use if else, but as the object gets deep, a lot of if else will come

// With Optional Chaining
console.log(restaurant.openingHours.mon?.open);
// Also - multiple can can also be there
console.log(restaurant?.openingHours?.mon?.open);
// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional Chaining on Methods
console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);
console.log(restaurant.orderRisotto?.(0, 1) ?? `Method does not exist`);

// Optional Chaining on Array
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
const userArr = [];
console.log(users[0]?.name ?? `User array empty`);
console.log(userArr[0]?.name ?? `User array empty`);

///////////////// For Of /////////////////
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
for (const item of menu) {
  console.log(item);
}

for (const [index, element] of menu.entries()) {
  console.log(index, element);
}

///////////////// Coding Challenge #1 /////////////////
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// Solution

// Task 1
const [player1, player2] = game.players;
console.log(player1, player2);

// Task 2
const [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers);

// Task 3
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

// Task 4
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// Task 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// Task 6
game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// Task 7
// team1 < team2
//   ? console.log(`Team 1 has higher chances of winning`)
//   : console.log(`Team 2 has higher chances of winning`);

team1 < team2 && console.log(`Team 1 has higher chances of winning`);
team2 < team1 && console.log(`Team 2 has higher chances of winning`);

///////////////// Nullish Coalesing /////////////////
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

///////////////// Short Circuiting /////////////////
console.log('---------- OR ----------');
console.log(3 || 'Harshit');
console.log('' || 'Harshit');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);
//const guests = restaurant.numGuests ? restaurant.numGuests : 10;
// OR
const guests2 = restaurant.numGuests || 10;
console.log(guests);
console.log('---------- AND ----------');
console.log(7 && 'Harshit');
console.log(23 && null && 'jonas');

if (restaurant.orderPizza) {
  restaurant.orderPizza('Paneer', 'PineApple');
} // OR
restaurant.orderPizza && restaurant.orderPizza('Paneer', 'PineApple');

///////////////// Rest Patterns & Parameters /////////////////

const arr = [1, 2, ...[3, 4]];

const [a, b, ...others] = arr;
console.log(a, b, others);

const [pizza, , rissoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, rissoto, otherFood);

// Objects

const { sat, ...weekdays2 } = restaurant.openingHours;
console.log(sat, weekdays2);

// Functions
// Rest Parameters
const add = function (...nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  console.log(sum);
};

add(2, 3);
add(2, 3, 4, 5, 6, 7);
add(3, 56, 16, 1, 643, 55, 43, 345);
const x = [23, 5, 7, 8];
add(...x);

restaurant.orderPizza('Paneer', 'Olives', 'Capsicum', 'Pineapples');

///////////////// Spread Operators /////////////////

const arr2 = [1, 2, 3, 4, 5];
const newArr = [-1, 0, ...arr2];
console.log(newArr);

console.log(newArr);
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two arrays
const menuArr = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuArr);

// Iterables
const str = 'Harshit';
console.log(...str);

const ingredients = ['Cheese', 'Onion', 'PineApple'];
restaurant.orderPasta(...ingredients);

const newRestaurant = {
  ...restaurant,
  founder: 'Someone Famous',
  foundIn: '1922',
};

console.log(newRestaurant);

///////////////// Destructuring Objects /////////////////

restaurant.orderDelivery({
  time: '22:30',
  address: 'Something Something - 24',
  mainIndex: 2,
  starterIndex: 1,
});

const { name, openingHours2, categories } = restaurant;
console.log(name, openingHours2, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

const { menu3 = [], starterMenu: starters = [] } = restaurant;
console.log(menu3, starters);

// Mutating Variables
let a1 = 111;
let b1 = 999;
const obj = { a1: 11, b1: 12, c: 13 };

({ a1, b1 } = obj);
console.log(a1, b);

// Destructuring nested object
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

///////////////// DESTRUCTURING ARRAYS /////////////////

const arr4 = [2, 3, 4];

const [a2, b2, c2] = arr4;

console.log(a, b, c);

let [main, secondary] = restaurant.categories;
console.log(main, secondary);

[secondary, main] = [main, secondary];

console.log(main, secondary);
const [starterCourse, mainCourse] = restaurant.order(2, 0);
console.log(starterCourse, mainCourse);

const nested = [2, 3, [4, 5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

const [i, , [j, , k]] = nested;
console.log(i, j, k);

// Default Values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
