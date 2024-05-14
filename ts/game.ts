// change player
const playerChange = (playerOne: any, playerTwo: any): void => {
  if (playerOne.playStatus === true) {
    playerOne.playStatus = false;
    playerTwo.playStatus = true;
    clearInterval(playerInterval);
  } else if (playerTwo.playStatus === true) {
    playerOne.playStatus = true;
    playerTwo.playStatus = false;
    clearInterval(playerInterval);
  }
};

// timer function
const playerInterval = setInterval(playerChange, 1500);
