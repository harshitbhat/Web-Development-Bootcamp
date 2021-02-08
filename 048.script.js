"use strict";

const helloBtn = document.querySelector("#hello");
const byeBtn = document.querySelector("#goodbye");

const sayHello = () => console.log("hello");
const sayBye = () => console.log("goodbye");

helloBtn.addEventListener("click", sayHello);
byeBtn.addEventListener("click", sayBye);
