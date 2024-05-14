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
const loadCards = (data, noOfCards) => {
    //collect noOfCards from ImageTileType and store it in a variable tiles
    const tiles = data.slice(0, noOfCards);
    //using spread store 2 tiles array in a single array
    const array = [...tiles, ...tiles];
    //shuffle the array
    shuffleArray(array);
    //using for loop add image to html file
    const imageTileContainer = document.getElementById("cards-container");
    for (let i = 0; i < noOfCards * 2; i++) {
        const tile = array[i];
        // console.log(tile);
        const imageElement = document.createElement("div");
        imageElement.classList.add("image-cards");
        imageElement.id = `img${i}`;
        imageElement.dataset.imgId = tile.id.toString();
        imageElement.innerHTML = `
    <img src="${tile.imageUrl}" alt="">
    `;
        imageTileContainer === null || imageTileContainer === void 0 ? void 0 : imageTileContainer.appendChild(imageElement);
    }
};
loadCards(imageData, 8);
let imageTiles = document.getElementsByClassName("image-cards");
//change class name
console.log(imageTiles);
for (let i = 0; i < imageTiles.length; i++) {
    imageTiles[i].addEventListener("click", function () {
        console.log(imageTiles[i].dataset.imgId);
        selectedCards.push(imageTiles[i]);
        // selectedCards.push(Number(imageTiles[i].getAttribute('data-imgId')))
        checkCards(selectedCards);
    });
}
let selectedCards = [];
function checkCards(selection) {
    if (selection.length === 2) {
        if (selection[0].dataset.imgId === selection[1].dataset.imgId) {
            console.log(selection[0]);
            console.log(document.getElementById(selection[0].id));
            // document.getElementById(selection[0].id)?.hidden
            document.getElementById(selection[0].id).style.visibility = 'hidden';
            document.getElementById(selection[1].id).style.visibility = 'hidden';
            // document.getElementById(selection[0].toString())?.style.visibility("none");
            console.log("right choice");
            if (playerOne.playStatus)
                updateLivescore(playerOne);
            else if (playerTwo.playStatus)
                updateLivescore(playerTwo); //function to add score
        }
        else {
            console.log("wrong choice");
            playerChange(playerOne, playerTwo); //function to change turn
        }
        selectedCards = [];
    }
}
let playerOne = {
    playerName: "Player 1",
    playStatus: true,
    points: 0
};
let playerTwo = {
    playerName: "Player 2",
    playStatus: false,
    points: 0
};
// change player
const playerChange = (playerOne, playerTwo) => {
    if (playerOne.playStatus === true) {
        playerOne.playStatus = false;
        playerTwo.playStatus = true;
        // clearInterval(playerInterval);
        console.log("player Two turn");
    }
    else if (playerTwo.playStatus === true) {
        playerOne.playStatus = true;
        playerTwo.playStatus = false;
        console.log("player one turn");
        // clearInterval(playerInterval);
    }
};
// timer function
// const playerInterval = setInterval(playerChange, 1500);
// type Score = {
//   player1: number;
//   player2: number;
// };
// let score: Score = { player1: 0, player2: 0 }; // initializing
const updateLivescore = (player) => {
    player.points += 1;
    console.log(player.playerName, player.points);
};
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
export {};
