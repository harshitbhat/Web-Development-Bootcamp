"use strict";

const myDiv = document.querySelector("#container");

for (let i = 1; i <= 100; i++) {
  const newButton = document.createElement("button");
  newButton.textContent = `Button - ${i}`;
  myDiv.appendChild(newButton);
}
