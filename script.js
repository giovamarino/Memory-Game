"use strict";

// random number generator
let randomNumber = 0;

// the first flash
function flashButton() {
  // random number generator
  randomNumber = Math.ceil(Math.random() * 16);

  // 1st purple flash
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
  console.log(randomNumberStorage);
  for (let index = 0; index < randomNumberStorage.length; index++) {
    console.log(`highlight ${randomNumberStorage.length} times`);
  }
}

// highlighting a button on refresh
window.onload = function () {
  for (let i = 1; i < 17; i++) {
    let buttonClass = `.btn-${i}`;

    document.querySelector(buttonClass).addEventListener(`click`, function () {
      //Check to see if the random number that was generated matched the number of the button
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

        setTimeout(() => {
          flashButton();
        }, 300);
      } else {
        document.querySelector(`.btn-${i}`).style.cssText = `        
          background-color: red;
      `;

        setTimeout(() => {
          document.querySelector(`.btn-${i}`).style.cssText = `
            transition-delay: 0.75s;
            background-color: transparent;
          `;
        }, 750);
      }
    });
  }

  flashButton();
};

let randomNumberStorage = [];

for (let index = 0; index < randomNumberStorage.length; index++) {
  console.log(`highlight ${randomNumberStorage.length} times`);
}
