const prices = [9.99, 1.5, 19.99, 49.99, 30.5];

let total = 0;
for (let i of prices) {
  total += i;
}

console.log(total);
const total2 = prices.reduce((total, i) => {
  return total + i;
});

console.log(total2);

const minimum = prices.reduce((min, i) => {
  return min < i ? min : i;
});

console.log(minimum);

const movies = [
  {
    title: "Amadeus",
    score: 99,
  },
  {
    title: "Stand By Me",
    score: 85,
  },
  {
    title: "Parasite",
    score: 95,
  },
  {
    title: "Alien",
    score: 90,
  },
];

const highestRated = movies.reduce((maxRated, i) => {
  return maxRated.score > i.score ? maxRated : i;
});

console.log(highestRated);
