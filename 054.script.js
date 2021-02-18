'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

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
