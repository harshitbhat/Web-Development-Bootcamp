"use strict";

const player1 = document.querySelector("#player1Score");
const player2 = document.querySelector("#player2Score");
const maxScore = document.querySelector("#maxPlays");
const player1BTN = document.querySelector("#player1BTN");
const player2BTN = document.querySelector("#player2BTN");
const resetBTN = document.querySelector("#reset");
let maxScoreVal = parseInt(maxScore.value);

const resetValues = () => {
  player1.innerHTML = 0;
  player2.innerHTML = 0;
  player1.style.color = "#1d3557";
  player2.style.color = "#1d3557";
  player1BTN.disabled = false;
  player2BTN.disabled = false;
  player1BTN.style.opacity = "1";
  player2BTN.style.opacity = "1";
};

const disablePlayers = () => {
  player1BTN.disabled = true;
  player2BTN.disabled = true;
  player1BTN.style.opacity = "0.7";
  player2BTN.style.opacity = "0.5";
};

maxScore.addEventListener("change", function (e) {
  maxScoreVal = parseInt(this.value);
  resetValues();
});

resetBTN.addEventListener("click", function (e) {
  maxScore.value = "5";
  maxScoreVal = 5;
  resetValues();
});

const scoreTracker = () => {
  const currScore1 = parseInt(player1.innerText);
  const currScore2 = parseInt(player2.innerText);
  if (currScore1 === maxScoreVal) {
    player1.style.color = "green";
    player2.style.color = "red";
    disablePlayers();
  }
  if (currScore2 === maxScoreVal) {
    player1.style.color = "red";
    player2.style.color = "green";
    disablePlayers();
  }
};

player1BTN.addEventListener("click", function (e) {
  let val = parseInt(player1.innerText);
  val++;
  player1.innerHTML = val;
  scoreTracker();
});

player2BTN.addEventListener("click", function (e) {
  let val = parseInt(player2.innerText);
  val++;
  player2.innerHTML = val;
  scoreTracker();
});
