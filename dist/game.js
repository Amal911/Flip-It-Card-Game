import { imageData } from "./imageData.js";
// document.getElementById("login")!.style.display = "block";
document.getElementById("category-section").style.display = "none";
document.getElementById("game-section").style.display = "none";
document.getElementById("winner-section").style.display = "none";
let imagesId = [];
let categoryBtns = document.getElementsByClassName("category-btn");
const categorySelection = (categoryName) => {
    console.log(categoryName);
    let data = imageData[categoryName];
    loadCards(data, 8);
    document.getElementById("category-section").style.display = "none";
    document.getElementById("game-section").style.display = "flex";
};
for (let i = 0; i < categoryBtns.length; i++) {
    categoryBtns[i].addEventListener("click", () => {
        console.log(categoryBtns[i].value);
        categorySelection(categoryBtns[i].value);
    });
}
let playerOne = {
    id: 1,
    playerName: localStorage.getItem('PlayerOne'),
    playerStatus: true,
    playerScore: 0,
};
let playerTwo = {
    id: 2,
    playerName: localStorage.getItem('PlayerTwo'),
    playerStatus: false,
    playerScore: 0,
};
const addImageEventListener = (data) => {
    let imageTiles = document.getElementsByClassName("image-cards");
    for (let i = 0; i < imageTiles.length; i++) {
        imageTiles[i].addEventListener("click", function () {
            imageTiles[i].classList.toggle("rotated");
            imageTiles[i].style.pointerEvents = "none";
            let image = imageTiles[i].getElementsByTagName("img");
            let imgData = data.filter((img) => Number(imageTiles[i].dataset.imgId) == img.id);
            image[0].src = imgData[0].imageUrl;
            selectedCards.push(imageTiles[i]);
            checkCards(selectedCards);
        });
    }
};
const loadCards = (data, noOfCards) => {
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
        imageElement.dataset.imgName = tile.name;
        imageElement.innerHTML = `
    <img src="../assets/bg.png" alt="">
    `;
        // <img src="${tile.imageUrl}" alt="">
        imageTileContainer === null || imageTileContainer === void 0 ? void 0 : imageTileContainer.appendChild(imageElement);
    }
    document.getElementById('player1-name').innerHTML = playerOne.playerName;
    document.getElementById('player2-name').innerHTML = playerTwo.playerName;
    addImageEventListener(data);
};
let selectedCards = [];
function checkCards(selection) {
    if (selection.length === 2) {
        if (selection[0].dataset.imgId === selection[1].dataset.imgId) {
            document.getElementById('image-name').innerHTML = selection[0].dataset.imgName;
            setTimeout(() => {
                document.getElementById(selection[0].id).style.visibility = "hidden";
                document.getElementById(selection[1].id).style.visibility = "hidden";
            }, 1000);
            console.log("right choice");
            imagesId = imagesId.filter((id) => id != Number(selection[0].dataset.imgId));
            if (playerOne.playerStatus)
                updateLivescore(playerOne);
            else if (playerTwo.playerStatus)
                updateLivescore(playerTwo); //function to add score
        }
        else {
            console.log("wrong choice");
            playerChange(playerOne, playerTwo); //function to change turn
            setTimeout(() => {
                selection[0].classList.toggle("rotated");
                selection[1].classList.toggle("rotated");
                selection[0].getElementsByTagName("img")[0].src = "../assets/bg.png";
                selection[1].getElementsByTagName("img")[0].src = "../assets/bg.png";
            }, 1000);
        }
        selection[0].style.pointerEvents = "auto";
        selection[1].style.pointerEvents = "auto";
        selectedCards = [];
        if (imagesId.length == 0)
            getWinner(playerOne, playerTwo);
    }
}
// change player
const playerChange = (playerOne, playerTwo) => {
    if (playerOne.playerStatus === true) {
        playerOne.playerStatus = false;
        playerTwo.playerStatus = true;
        setTimeout(() => {
            document.getElementById("player1").classList.toggle("player-active");
            document.getElementById("player2").classList.toggle("player-active");
        }, 1000);
        // clearInterval(playerInterval);
        // playerInterval;
        console.log("player Two turn");
    }
    else if (playerTwo.playerStatus === true) {
        setTimeout(() => {
            document.getElementById("player1").classList.toggle("player-active");
            document.getElementById("player2").classList.toggle("player-active");
        }, 1000);
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
const updateLivescore = (player) => {
    player.playerScore += 1;
    if (player.id === 1) {
        document.getElementById("player1-score").innerHTML = player.playerScore.toString();
    }
    else {
        document.getElementById("player2-score").innerHTML = player.playerScore.toString();
    }
    console.log(player.playerName, player.playerScore);
};
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
// const getWinner = (player1: PlayerType, player2: PlayerType): PlayerType[] => {
//   let winnerList: PlayerType[] = [];
//   if (player1.playerScore > player2.playerScore) {
//     winnerList.push(player1);
//     console.log(player1.playerName + " Wins with score " + player1.playerScore);
//   } else if (player1.playerScore < player2.playerScore) {
//     console.log(player2.playerName + " Wins with score " + player2.playerScore);
//     winnerList.push(player2);
//   } else {
//     console.log("Draw");
//     winnerList.push(player1);
//     winnerList.push(player2);
//   }
//   return winnerList;
// };
const getWinner = (player1, player2) => {
    let winnerList = [];
    if (player1.playerScore > player2.playerScore) {
        winnerList.push(player1);
        console.log(player1.playerName + " Wins with score " + player1.playerScore);
        document.getElementById("game-section").style.display = "none";
        document.getElementById("winner-section").style.display = "block";
        const app = document.getElementById("winner-container");
        const winnerp = document.createElement("p");
        winnerp.textContent = (player1.playerName + " Won ");
        app === null || app === void 0 ? void 0 : app.appendChild(winnerp);
        const scorep = document.createElement("p");
        scorep.textContent = ("Score: " + player1.playerScore);
        app === null || app === void 0 ? void 0 : app.appendChild(scorep);
    }
    else if (player1.playerScore < player2.playerScore) {
        console.log(player2.playerName + " Wins with score " + player2.playerScore);
        winnerList.push(player2);
        document.getElementById("game-section").style.display = "none";
        document.getElementById("winner-section").style.display = "block";
        const app = document.getElementById("winner-container");
        const winnerp = document.createElement("p");
        winnerp.textContent = (player2.playerName + " Won ");
        app === null || app === void 0 ? void 0 : app.appendChild(winnerp);
        const scorep = document.createElement("p");
        scorep.textContent = ("Score: " + player2.playerScore);
        app === null || app === void 0 ? void 0 : app.appendChild(scorep);
    }
    else {
        console.log("Draw");
        winnerList.push(player1);
        winnerList.push(player2);
        document.getElementById("game-section").style.display = "none";
        const app = document.getElementById("winner-container");
        const p = document.createElement("p");
        p.textContent = "Draw";
        app === null || app === void 0 ? void 0 : app.appendChild(p);
    }
    return winnerList;
};
// login and signup functions
let playeOneSignButton = document.getElementById("playeOneSignButton");
playeOneSignButton.addEventListener("click", () => {
    document.getElementById("loginForm-player1").style.display = "none";
    document.getElementById("signupForm-player1").style.display = "block";
});
let playeTwoSignButton = document.getElementById("playeTwoSignButton");
playeTwoSignButton.addEventListener("click", () => {
    document.getElementById("loginForm-player2").style.display = "none";
    document.getElementById("signupForm-player2").style.display = "block";
});
let playerOneLoginButton = document.getElementById("playerOneLoginButton");
playerOneLoginButton.addEventListener("click", () => {
    document.getElementById("loginForm-player1").style.display = "block";
    document.getElementById("signupForm-player1").style.display = "none";
});
let playerTwoLoginButton = document.getElementById("playerTwoLoginButton");
playerTwoLoginButton.addEventListener("click", () => {
    document.getElementById("loginForm-player2").style.display = "block";
    document.getElementById("signupForm-player2").style.display = "none";
});
// let playersJoined = {
//   playerOne: false,
//   playerTwo: false,
// };
// let login = document.getElementsByClassName(
//   "login-form"
// ) as HTMLCollectionOf<HTMLFormElement>;
// for (let i = 0; i < login.length; i++) {
//   login[i].addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(login[i]);
//     let playerLogin: PlayerLoginType = {
//       username: formData.get("username") as string,
//       password: formData.get("password") as string,
//       player: formData.get("player") as string,
//     };
//     console.log(playerLogin);
//     if (playerLogin.player == "PlayerOne") {
//       playersJoined.playerOne = true;
//       console.log("Player One", playerLogin);
//     } else if (playerLogin.player == "PlayerTwo") {
//       playersJoined.playerTwo = true;
//       console.log("Player Two", playerLogin);
//     }
//     if (playersJoined.playerOne && playersJoined.playerTwo) {
//       document.getElementById("login")!.style.display = "none";
//       document.getElementById("category-section")!.style.display = "block";
//     }
//   });
// }
// let signup = document.getElementsByClassName(
//   "signup-form"
// ) as HTMLCollectionOf<HTMLFormElement>;
// for (let i = 0; i < signup.length; i++) {
//   signup[i].addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(signup[i]);
//     let playerSignup: PlayerSigninType = {
//       name: formData.get("name") as string,
//       username: formData.get("username") as string,
//       password: formData.get("password") as string,
//       player: formData.get("player") as string,
//     };
//     if (playerSignup.player == "PlayerOne") {
//       console.log("Player One", playerSignup);
//     } else {
//       console.log("Player Two", playerSignup);
//     }
//   });
// }
