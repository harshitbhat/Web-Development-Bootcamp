var nameVar = 'Harshit';
var nameVar = 'Mike';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Julie';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);

function getPetName() {
  const petName = 'Hal';
  return petName;
}

// Block Scoping

var fullName = 'Andrew Meed';
let firstName;

if (fullName) {
  firstName = fullName.split(' ')[0];
  console.log(firstName);
}

console.log(firstName);

// Arrow Function
const square = function (a) {
  console.log(arguments);
  return a * a;
};

const squareArw = (a) => a * a;

console.log(squareArw(7));
