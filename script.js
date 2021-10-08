"use strict";

// random number generator
let randomNumber = 0;
let randomNumberStorage = [];

// the first randomly generated flash + new randomly generated flashes
// generates a new number, turns the box purple, then transparent, then pushes the number to the arr
function newButton() {
  // random number generator
  randomNumber = Math.ceil(Math.random() * 16);

  document.querySelector(`.btn-${randomNumber}`).style.cssText = `
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

        // let scoreText = document.querySelector(`.score`).innerHTML;
        // let highScoreText =
        //   document.querySelector(`.highScoreNumber`).innerHTML;

        // change score
        document.querySelector(`.score`).innerHTML = randomNumberStorage.length;

        // change highscore
        let score = Number(document.querySelector(`.score`).innerHTML);
        let highScore = Number(
          document.querySelector(`.highScoreNumber`).innerHTML
        );

        if (score > highScore) {
          document.querySelector(`.highScoreNumber`).innerHTML =
            document.querySelector(`.score`).innerHTML;
          console.log(`hello`);
        }

        // Highlight each button from randomNumberStorage
        // for (let index = 0; index < randomNumberStorage.length; index++) {
        //   let buttonClass2 = `.btn-${index}`;
        //   setTimeout(() => {
        //     document.querySelector(buttonClass2).style.cssText = `
        //       background-color: limegreen;
        //     `;

        //     console.log(randomNumberStorage[index]);
        //     console.log(document.querySelector(`btn-${index}`));
        //   }, 500);
        // }
        // makes a new button after changing box colors
        setTimeout(() => {
          newButton();
        }, 300 /*5000*/);
      }

      // if user clicks the WRONG box: turn box red & disable clicking
      else {
        document.querySelector(`.btn-${i}`).style.backgroundColor = `red`;

        // disables clicking
        for (let i = 0; i < 16; i++) {
          document.querySelectorAll(`.button`)[i].style.pointerEvents = `none`;
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
