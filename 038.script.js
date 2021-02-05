"use strict";

const names = [
  "mark",
  "staceymom1978",
  "q12323423231257i16521",
  "carrie98",
  "MoanaFan",
];

const validUserNames = (names) => {
  return names.filter((str) => {
    return str.length < 10;
  });
};

console.log(validUserNames(names));
