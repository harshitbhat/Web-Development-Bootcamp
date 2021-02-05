"use strict";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 8, 6, 3, 6, 8, 1, 4];

numbers.filter((n) => {
  return n % 2 === 1;
});
