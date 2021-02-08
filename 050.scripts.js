"use strict";

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const item = form.elements.product.value;
  const quantity = form.elements.qty.value;
  console.log(item, quantity);

  const listContainer = document.querySelector("#list");
  const newItem = document.createElement("li");
  newItem.textContent = `${quantity} ${item}`;
  listContainer.appendChild(newItem);
  form.elements.product.value = "";
  form.elements.qty.value = "";
});
