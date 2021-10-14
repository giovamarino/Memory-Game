"use strict";

// random number generator
let randomNumber = 0;
let randomNumberStorage = [];

let indexOfButtonToHighlight = 0;
let sequenceRepeatCurrentIndex = 0; // used as the index for randomNumberStorage
let userCanPressButtons = false;

/* the first randomly generated flash + new randomly generated flashes generates a new number, turns the box purple, then transparent, then pushes the number to the arr */
function newButton() {
  sequenceRepeatCurrentIndex = 0;
  // random number generator
  let randomNumber = Math.ceil(Math.random() * 16);

  randomNumberStorage.push(randomNumber);

  //unrelated console logs
  console.log(randomNumberStorage);
  for (let index = 0; index < randomNumberStorage.length; index++) {
    console.log(`highlight ${randomNumberStorage.length} times`);
  }

  flashButton();

  // change score
  document.querySelector(`.score`).innerHTML = randomNumberStorage.length - 1;

  // change highscore
  let score = Number(document.querySelector(`.score`).innerHTML);
  let highScore = Number(document.querySelector(`.highScoreNumber`).innerHTML);

  if (score > highScore) {
    document.querySelector(`.highScoreNumber`).innerHTML =
      document.querySelector(`.score`).innerHTML;
  }
}

function flashButton() {
  // Highlight each button from randomNumberStorage
  let buttonClass2 = `.btn-${randomNumberStorage[indexOfButtonToHighlight]}`;

  setTimeout(() => {
    document.querySelector(buttonClass2).style.cssText = `
    background-color: darkviolet;
  `;

    setTimeout(() => {
      document.querySelector(buttonClass2).style.cssText = `
    transition-delay: 0.05;
    background-color: transparent;
  `;
    }, 250);

    if (indexOfButtonToHighlight < randomNumberStorage.length - 1) {
      indexOfButtonToHighlight++;

      setTimeout(flashButton, 250);
    } else {
      userCanPressButtons = true;
      indexOfButtonToHighlight = 0;
    }
  }, 250);
}

// highlighting a button on refresh
window.onload = function () {
  // selects a button (1-16)
  for (let i = 1; i < 17; i++) {
    // Check to see if the randomly generated number matches the number of the button clicked
    document.querySelector(`.btn-${i}`).addEventListener(`click`, function () {
      // if user clicks the RIGHT box: turn box green, then transparent
      if (userCanPressButtons) {
        if (i === randomNumberStorage[sequenceRepeatCurrentIndex]) {
          document.querySelector(`.btn-${i}`).style.cssText = `
            background-color: limegreen;
        `;
          setTimeout(() => {
            document.querySelector(`.btn-${i}`).style.cssText = `
              transition-delay: 0.05s;
              background-color: transparent;
            `;
          }, 50);

          // change score
          // document.querySelector(`.score`).innerHTML =
          //   randomNumberStorage.length;

          // // change highscore
          // let score = Number(document.querySelector(`.score`).innerHTML);
          // let highScore = Number(
          //   document.querySelector(`.highScoreNumber`).innerHTML
          // );

          // if (score > highScore) {
          //   document.querySelector(`.highScoreNumber`).innerHTML =
          //     document.querySelector(`.score`).innerHTML;
          // }

          // makes a new button after changing box colors

          if (sequenceRepeatCurrentIndex < randomNumberStorage.length - 1) {
            sequenceRepeatCurrentIndex++;
          } else {
            setTimeout(() => {
              userCanPressButtons = false;
              newButton();
            }, 300);
          }
        }

        // if user clicks the WRONG box: turn box red & disable clicking
        else {
          // userCanPressButtons = false;
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

// Reset Button
document.querySelector(`.resetButton`).addEventListener(`click`, function () {
  randomNumberStorage = [];

  // Disables spam-clicking the reset button
  document.querySelector(`.resetButton`).style.pointerEvents = `none`;
  setTimeout(() => {
    document.querySelector(`.resetButton`).style.pointerEvents = `revert`;
  }, 1000);

  // Resets the score
  document.querySelector(`.score`).innerHTML = randomNumberStorage.length;

  for (let i = 0; i < 16; i++) {
    document.querySelectorAll(`.button`)[i].style.pointerEvents = `revert`;
  }

  for (let i = 1; i < 17; i++) {
    document.querySelector(`.btn-${i}`).style.backgroundColor = `transparent`;
  }

  setTimeout(() => {
    newButton();
  }, 300);
});
