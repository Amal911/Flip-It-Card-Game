import {
  ImageTileType,
  PlayerLoginType,
  PlayerSigninType,
  PlayerType,
} from "./types/types";

const imageData = [
  {
    id: 1,
    name: "Example 1",
    imageUrl: "../assets/animals/cat.png",
  },
  {
    id: 2,
    name: "Example 2",
    imageUrl: "../assets/animals/deer.png",
  },
  {
    id: 3,
    name: "Example 3",
    imageUrl: "../assets/animals/dog.png",
  },
  {
    id: 4,
    name: "Example 4",
    imageUrl: "../assets/animals/elephant.png",
  },
  {
    id: 5,
    name: "Example 4",
    imageUrl: "../assets/animals/panda.png",
  },
  {
    id: 6,
    name: "Example 4",
    imageUrl: "../assets/animals/rabbit.png",
  },
  {
    id: 7,
    name: "Example 4",
    imageUrl: "../assets/animals/squirrel.png",
  },
  {
    id: 8,
    name: "Example 4",
    imageUrl: "../assets/animals/tiger.png",
  },
];

let imagesId: number[] = [];

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
    // console.log(tile);

    const imageElement = document.createElement("div");
    imageElement.classList.add("image-cards");
    imageElement.classList.add("rotating");
    imageElement.id = `img${i}`;
    imageElement.dataset.imgId = tile.id.toString();
    imageElement.innerHTML = `
    <img src="../assets/bg.png" alt="">
    `;
    // <img src="${tile.imageUrl}" alt="">

    imageTileContainer?.appendChild(imageElement);
  }
};

loadCards(imageData, 8);

let imageTiles: HTMLCollectionOf<HTMLDivElement> =
  document.getElementsByClassName(
    "image-cards"
  ) as HTMLCollectionOf<HTMLDivElement>;

for (let i = 0; i < imageTiles.length; i++) {
  imageTiles[i].addEventListener("click", function () {
    imageTiles[i].classList.toggle("rotated");
    let image = imageTiles[i]!.getElementsByTagName("img");
    let imgData = imageData.filter(
      (img) => Number(imageTiles[i].dataset.imgId) == img.id
    );
    image[0].src = imgData[0].imageUrl;

    selectedCards.push(imageTiles[i]);

    checkCards(selectedCards);
  });
}

let selectedCards: HTMLDivElement[] = [];
function checkCards(selection: HTMLDivElement[]) {
  if (selection.length === 2) {
    if (selection[0].dataset.imgId === selection[1].dataset.imgId) {
      document.getElementById(selection[0].id)!.style.visibility = "hidden";
      document.getElementById(selection[1].id)!.style.visibility = "hidden";

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
    selectedCards = [];
    if (imagesId.length == 0) getWinner(playerOne, playerTwo);
  }
}

let playerOne: PlayerType = {
  id: 1,
  playerName: "Player 1",
  playerStatus: true,
  playerScore: 0,
};
let playerTwo: PlayerType = {
  id: 2,
  playerName: "Player 2",
  playerStatus: false,
  playerScore: 0,
};

// change player
const playerChange = (playerOne: PlayerType, playerTwo: PlayerType): void => {
  if (playerOne.playerStatus === true) {
    playerOne.playerStatus = false;
    playerTwo.playerStatus = true;
    // clearInterval(playerInterval);
    // playerInterval;
    console.log("player Two turn");
  } else if (playerTwo.playerStatus === true) {
    playerOne.playerStatus = true;
    playerTwo.playerStatus = false;
    console.log("player one turn");
    // clearInterval(playerInterval);
  }
};

// timer function
// const playerInterval = setTimeout(playerChange, 1500);

// type Score = {
//   player1: number;
//   player2: number;
// };

// let score: Score = { player1: 0, player2: 0 }; // initializing

const updateLivescore = (player: PlayerType) => {
  player.playerScore += 1;
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
  if (player1.playerScore > player2.playerScore) {
    winnerList.push(player1);
    console.log(player1.playerName + " Wins with score " + player1.playerScore);
  } else if (player1.playerScore < player2.playerScore) {
    console.log(player2.playerName + " Wins with score " + player2.playerScore);
    winnerList.push(player2);
  } else {
    console.log("Draw");

    winnerList.push(player1);
    winnerList.push(player2);
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

let login = document.getElementsByClassName("login-form") as HTMLCollectionOf<HTMLFormElement>;
for(let i=0;i<login.length;i++){

  login[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(login[i]);
    let playerLogin: PlayerLoginType = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      player: formData.get("player") as string,
    };
    
    console.log(playerLogin);
    
    
    if (playerLogin.player == "PlayerOne") {
      console.log("Player One", playerLogin);
    } else if(playerLogin.player=="PlayerTwo"){
      console.log("Player Two", playerLogin);
    }
  });
}

let signup = document.getElementsByClassName("signup-form") as HTMLCollectionOf<HTMLFormElement>;
for(let i=0;i<signup.length;i++){

  signup[i].addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signup[i]);
    let playerSignup: PlayerSigninType = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      player: formData.get("player") as string,
    };
    if (playerSignup.player == "PlayerOne") {
      console.log("Player One", playerSignup);
    } else {
      console.log("Player Two", playerSignup);
    }
  });
  
}