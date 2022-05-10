"use strict";

let randomNumberStorage = []; // Holds all the numbers
let randomNumberStorageIndex = 0; // Used as the index for randomNumberStorage
let userCanPressButtons = false; // Allows clicking or not

// Highlighting a button on refresh
window.onload = () => {
  // Selects a button (1-16)
  for (let i = 1; i < 17; i++) {
    // Check to see if the randomly generated number matches the number of the button clicked
    document.querySelector(`.btn-${i}`).addEventListener(`click`, () => {
      // If user clicks the RIGHT box: turn box green, then transparent
      if (userCanPressButtons) {
        if (i === randomNumberStorage[randomNumberStorageIndex]) {
          document.querySelector(`.btn-${i}`).style.cssText = `
            background-color: limegreen;
        `;
          setTimeout(() => {
            document.querySelector(`.btn-${i}`).style.cssText = `
              transition-delay: 0.05s;
              background-color: transparent;
            `;
          }, 50);

          // Measures if we finished the array of stored numbers, if not then we generate a new number
          if (randomNumberStorageIndex < randomNumberStorage.length - 1) {
            randomNumberStorageIndex++;
          } else {
            userCanPressButtons = false;
            setTimeout(() => {
              newButton();
            }, 300);
          }
        }

        // If user clicks the WRONG box: turn box red & disable clicking
        else {
          userCanPressButtons = false;
          document.querySelector(`.btn-${i}`).style.backgroundColor = `red`;

          // disables clicking
          for (let i = 0; i < 16; i++) {
            document.querySelectorAll(`.button`)[
              i
            ].style.pointerEvents = `none`;
          }
        }
      }
    });
  }
  newButton();
};

// Generates a random number & handles score/highscore
const newButton = () => {
  // Resetting index
  randomNumberStorageIndex = 0;

  // Random number generator
  let randomNumber = Math.ceil(Math.random() * 16);

  // Pushing new box/number to end of the array
  randomNumberStorage.push(randomNumber);

  // Change score
  document.querySelector(`.score`).innerHTML = randomNumberStorage.length - 1;

  // Change highscore
  let score = Number(document.querySelector(`.score`).innerHTML);
  let highScore = Number(document.querySelector(`.highScoreNumber`).innerHTML);

  if (score > highScore) {
    document.querySelector(`.highScoreNumber`).innerHTML =
      document.querySelector(`.score`).innerHTML;
  }
  flashButton();
};

// Flashes each button
const flashButton = () => {
  // Highlight each button from randomNumberStorage
  let currentButton = `.btn-${randomNumberStorage[randomNumberStorageIndex]}`;
  setTimeout(() => {
    document.querySelector(currentButton).style.cssText = `
    background-color: darkviolet;
  `;
    setTimeout(() => {
      document.querySelector(currentButton).style.cssText = `
    transition-delay: 0.05;
    background-color: transparent;
  `;
    }, 250);

    // Measures if we finished the array of stored numbers, if not then we flash next button
    if (randomNumberStorageIndex < randomNumberStorage.length - 1) {
      randomNumberStorageIndex++;
      setTimeout(flashButton, 250);
    } else {
      userCanPressButtons = true;
      randomNumberStorageIndex = 0;
    }
  }, 250);
};

// Reset Button
document.querySelector(`.resetButton`).addEventListener(`click`, () => {
  randomNumberStorage = [];

  userCanPressButtons = false;

  for (let i = 1; i < 17; i++) {
    document.querySelector(`.btn-${i}`).style.backgroundColor = `transparent`;
  }

  // Resets the score
  document.querySelector(`.score`).innerHTML = randomNumberStorage.length;

  // Disables spam-clicking the reset button
  document.querySelector(`.resetButton`).style.pointerEvents = `none`;
  setTimeout(() => {
    document.querySelector(`.resetButton`).style.pointerEvents = `revert`;
  }, 1000);

  // Lets you click again. Clicking the wrong box turns off clicking so this is a safety measure
  for (let i = 0; i < 16; i++) {
    document.querySelectorAll(`.button`)[i].style.pointerEvents = `revert`;
  }

  setTimeout(() => {
    newButton();
  }, 300);
});
