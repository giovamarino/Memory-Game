"use strict";

// random number generator
let randomNumber = 0;

// the first randomly generated flash + new randomly generated flashes
// generates a new number, turns the box purple, then transparent, then pushes the number to the arr
function newButton() {
  // random number generator
  randomNumber = Math.ceil(Math.random() * 16);

  document.querySelector(`.btn-${randomNumber}`).style.cssText = `
  transition-delay: 0.25s;
  background-color: darkviolet;
`;

  setTimeout(() => {
    document.querySelector(`.btn-${randomNumber}`).style.cssText = `
  transition-delay: 0.25s;
  background-color: transparent;
`;
  }, 250);

  randomNumberStorage.push(randomNumber);

  //unrelated console logs
  console.log(randomNumberStorage);
  for (let index = 0; index < randomNumberStorage.length; index++) {
    console.log(`highlight ${randomNumberStorage.length} times`);
  }
}

// highlighting a button on refresh
window.onload = function () {
  // selects a button (1-16)
  for (let i = 1; i < 17; i++) {
    let buttonClass = `.btn-${i}`;

    // Check to see if the randomly generated number matches the number of the button clicked
    document.querySelector(buttonClass).addEventListener(`click`, function () {
      // if user clicks the RIGHT box: turn box green, then transparent
      if (i === randomNumber) {
        document.querySelector(`.btn-${i}`).style.cssText = `
          background-color: limegreen;
      `;

        setTimeout(() => {
          document.querySelector(`.btn-${i}`).style.cssText = `
            transition-delay: 0.05s;
            background-color: transparent;
          `;
        }, 50);

        // highlight the squares
        // for (let index = 0; index < randomNumberStorage.length; index++) {
        //   // highlight the squares
        // }

        // makes a new button after changing box colors
        setTimeout(() => {
          newButton();
        }, 300);
      }

      // if user clicks the WRONG box: turn box red & disable clicking
      else {
        document.querySelector(`.btn-${i}`).style.backgroundColor = `red`;

        // disables clicking
        for (let i = 0; i < 16; i++) {
          document.querySelectorAll(`.button`)[i].style.pointerEvents = `none`;
        }

        // setTimeout(() => {
        //   document.querySelector(`.btn-${i}`).style.cssText = `
        //     transition-delay: 0.75s;
        //     background-color: transparent;
        //   `;
        // }, 750);
      }
    });
  }
  newButton();
};

let randomNumberStorage = [];
