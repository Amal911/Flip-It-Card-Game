import {
  ImageDataType,
  ImageTileType,
  PlayerLoginType,
  PlayerSigninType,
  PlayerType,
} from "./types/types";
import { imageData } from "./imageData.js";


document.getElementById("category-section")!.style.display = "none";
document.getElementById("game-section")!.style.display = "none";
document.getElementById("winner-section")!.style.display = "none";
(document.getElementById("image-name") as HTMLParagraphElement).style.display='none';
let imagesId: number[] = [];

let categoryBtns: HTMLCollectionOf<HTMLButtonElement> =
  document.getElementsByClassName(
    "category-btn"
  ) as HTMLCollectionOf<HTMLButtonElement>;

const categorySelection = (categoryName: string): void => {
  console.log(categoryName);
  let data: ImageTileType[] = imageData[categoryName as keyof ImageDataType];
  loadCards(data, 8);
  document.getElementById("category-section")!.style.display = "none";
  document.getElementById("game-section")!.style.display = "flex";
};
for (let i = 0; i < categoryBtns.length; i++) {
  categoryBtns[i].addEventListener("click", () => {
    console.log(categoryBtns[i].value);
    categorySelection(categoryBtns[i].value);
  });
}

let playerOne: PlayerType = {
  id: 1,
  playerName: localStorage.getItem('PlayerOne') as string,
  playerStatus: true,
  playerScore: 0,
};
let playerTwo: PlayerType = {
  id: 2,
  playerName: localStorage.getItem('PlayerTwo') as string,
  playerStatus: false,
  playerScore: 0,
};

const addImageEventListener = (data: ImageTileType[]) => {
  let imageTiles: HTMLCollectionOf<HTMLDivElement> =
    document.getElementsByClassName(
      "image-cards"
    ) as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < imageTiles.length; i++) {
    imageTiles[i].addEventListener("click", function () {
      imageTiles[i].classList.toggle("rotated");
      imageTiles[i].style.pointerEvents = "none";
      let image = imageTiles[i]!.getElementsByTagName("img");
      let imgData = data.filter(
        (img) => Number(imageTiles[i].dataset.imgId) == img.id
      );
      image[0].src = imgData[0].imageUrl;
      selectedCards.push(imageTiles[i]);

      checkCards(selectedCards);
    });
  }
};

const loadCards = (data: ImageTileType[], noOfCards: number) => {
  const tiles = data.slice(0, noOfCards);
  tiles.forEach((tile) => {
    imagesId.push(tile.id);
  });

  const array = [...tiles, ...tiles];

  shuffleArray(array);

  const imageTileContainer = document.getElementById("cards-container");

  for (let i = 0; i < noOfCards * 2; i++) {
    const tile = array[i];


    const imageElement = document.createElement("div");
    imageElement.classList.add("image-cards");
    imageElement.classList.add("rotating");
    imageElement.id = `img${i}`;
    imageElement.dataset.imgId = tile.id.toString();
    imageElement.dataset.imgName = tile.name;
    imageElement.innerHTML = `
    <img src="../assets/bg.png" alt="">
    `;


    imageTileContainer?.appendChild(imageElement);
  }
  (document.getElementById("player1-name") as HTMLParagraphElement).innerHTML =
    playerOne.playerName;
  (document.getElementById("player2-name") as HTMLParagraphElement).innerHTML =
    playerTwo.playerName;
  addImageEventListener(data);
};

let selectedCards: HTMLDivElement[] = [];
function checkCards(selection: HTMLDivElement[]) {
  if (selection.length === 2) {
    if (selection[0].dataset.imgId === selection[1].dataset.imgId) {
      (
        document.getElementById("image-name") as HTMLParagraphElement
      ).innerHTML = selection[0].dataset.imgName as string;
      (
        document.getElementById("image-name") as HTMLParagraphElement
      ).style.display='block'
      setTimeout(() => {
        (
          document.getElementById(selection[0].id) as HTMLDivElement
        ).style.visibility = "hidden";
        (
          document.getElementById(selection[1].id) as HTMLDivElement
        ).style.visibility = "hidden";
        (
          document.getElementById("image-name") as HTMLParagraphElement
        ).style.display='none'
      }, 1000);

      console.log("right choice");
      imagesId = imagesId.filter(
        (id) => id != Number(selection[0].dataset.imgId)
      );
      if (playerOne.playerStatus) updateLivescore(playerOne);
      else if (playerTwo.playerStatus) updateLivescore(playerTwo); //function to add score
    } else {
      console.log("wrong choice");
      playerChange(playerOne, playerTwo); //function to change turn
      setTimeout(() => {
        selection[0].classList.toggle("rotated");
        selection[1].classList.toggle("rotated");
        selection[0]!.getElementsByTagName("img")[0].src = "../assets/bg.png";
        selection[1]!.getElementsByTagName("img")[0].src = "../assets/bg.png";
      }, 1000);
    }
    selection[0].style.pointerEvents = "auto";
    selection[1].style.pointerEvents = "auto";
    selectedCards = [];
    if (imagesId.length == 0) getWinner(playerOne, playerTwo);
  }
}

// change player
const playerChange = (playerOne: PlayerType, playerTwo: PlayerType): void => {
  if (playerOne.playerStatus === true) {
    playerOne.playerStatus = false;
    playerTwo.playerStatus = true;
    setTimeout(() => {
      (document.getElementById("player1") as HTMLDivElement).classList.toggle(
        "player-active"
      );
      (document.getElementById("player2") as HTMLDivElement).classList.toggle(
        "player-active"
      );
    }, 1000);

    console.log("player Two turn");
  } else if (playerTwo.playerStatus === true) {
    setTimeout(() => {
      (document.getElementById("player1") as HTMLDivElement).classList.toggle(
        "player-active"
      );
      (document.getElementById("player2") as HTMLDivElement).classList.toggle(
        "player-active"
      );
    }, 1000);
    playerOne.playerStatus = true;
    playerTwo.playerStatus = false;
    console.log("player one turn");

  }
};

const updateLivescore = (player: PlayerType) => {
  player.playerScore += 1;
  if (player.id === 1) {
    (
      document.getElementById("player1-score") as HTMLParagraphElement
    ).innerHTML = player.playerScore.toString();
  } else {
    (
      document.getElementById("player2-score") as HTMLParagraphElement
    ).innerHTML = player.playerScore.toString();
  }
  console.log(player.playerName, player.playerScore);
};

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const getWinner = (player1: PlayerType, player2: PlayerType): PlayerType[] => {
  let winnerList: PlayerType[] = [];
  document.getElementById("game-section")!.style.display = "none";
  document.getElementById("winner-section")!.style.display = "block";
  if (player1.playerScore > player2.playerScore) {
    winnerList.push(player1);
    console.log(player1.playerName + " Wins with score " + player1.playerScore);
   
    const app = document.getElementById("winner-container");
    const winnerp = document.createElement("p");
    winnerp.textContent = player1.playerName + " Won ";
    app?.appendChild(winnerp);
    const scorep = document.createElement("p");
    scorep.textContent = "Score: " + player1.playerScore;
    app?.appendChild(scorep);
  } else if (player1.playerScore < player2.playerScore) {
    console.log(player2.playerName + " Wins with score " + player2.playerScore);
    winnerList.push(player2);

    const app = document.getElementById("winner-container");
    const winnerp = document.createElement("p");
    winnerp.textContent = player2.playerName + " Won ";
    app?.appendChild(winnerp);
    const scorep = document.createElement("p");
    scorep.textContent = "Score: " + player2.playerScore;
    app?.appendChild(scorep);
  } else {
    console.log("Draw");

    winnerList.push(player1);
    winnerList.push(player2);

    document.getElementById("game-section")!.style.display = "none";
    const app = document.getElementById("winner-container");
    const p = document.createElement("p");
    p.textContent = "Draw";
    app?.appendChild(p);
  }
  return winnerList;
};

// login and signup functions
let playeOneSignButton = document.getElementById(
  "playeOneSignButton"
) as HTMLButtonElement;
playeOneSignButton.addEventListener("click", () => {
  (
    document.getElementById("loginForm-player1") as HTMLDivElement
  ).style.display = "none";
  (
    document.getElementById("signupForm-player1") as HTMLDivElement
  ).style.display = "block";
});
let playeTwoSignButton = document.getElementById(
  "playeTwoSignButton"
) as HTMLButtonElement;
playeTwoSignButton.addEventListener("click", () => {
  (
    document.getElementById("loginForm-player2") as HTMLDivElement
  ).style.display = "none";
  (
    document.getElementById("signupForm-player2") as HTMLDivElement
  ).style.display = "block";
});

let playerOneLoginButton = document.getElementById(
  "playerOneLoginButton"
) as HTMLButtonElement;
playerOneLoginButton.addEventListener("click", () => {
  (
    document.getElementById("loginForm-player1") as HTMLDivElement
  ).style.display = "block";
  (
    document.getElementById("signupForm-player1") as HTMLDivElement
  ).style.display = "none";
});

let playerTwoLoginButton = document.getElementById(
  "playerTwoLoginButton"
) as HTMLButtonElement;
playerTwoLoginButton.addEventListener("click", () => {
  (
    document.getElementById("loginForm-player2") as HTMLDivElement
  ).style.display = "block";
  (
    document.getElementById("signupForm-player2") as HTMLDivElement
  ).style.display = "none";
});

