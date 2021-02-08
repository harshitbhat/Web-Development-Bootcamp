"use strict";

const btn = document.querySelector("button");
const text = document.querySelector("h1");

const randomColorGenerator = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};
btn.addEventListener("click", function () {
  const randomColor = randomColorGenerator();
  document.body.style.backgroundColor = randomColor;
  text.innerText = randomColor;
});
