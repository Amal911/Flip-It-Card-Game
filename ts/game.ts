
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


import { ImageTileType } from "./types/types";

let selectedCards:number[] = [];

  let imageTiles:HTMLCollectionOf<HTMLDivElement>  = document.getElementsByClassName("image") as  HTMLCollectionOf<HTMLDivElement>                //change class name
  for(let i=0; i<imageTiles.length; i++){
    imageTiles[i].addEventListener("click", function(){
        selectedCards.push(Number(imageTiles[i].id))
        // selectedCards.push(Number(imageTiles[i].getAttribute('data-imgId')))
        checkCards(selectedCards)
    })

  }
  

function checkCards(selection:number[]) {
  if (selection.length === 2) {
    if (document.getElementById(selection[0].toString())?.getAttribute('data-imgId') === document.getElementById(selection[0].toString())?.getAttribute('data-imgId') ) {
        document.getElementById(selection[0].toString())?.style.visibility("none");
      addScore();                                             //function to add score
    } else {
      changeTurn();                                           //function to change turn
    }
    selectedCards = [];
  }
}

const imageTile = [
  {
    id: 1,
    name: "Example 1",
    url: "https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?w=215&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  {
    id: 2,
    name: "Example 2",
    url: "https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?w=215&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  {
    id: 3,
    name: "Example 3",
    url: "https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?w=215&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  {
    id: 4,
    name: "Example 4",
    url: "https://th.bing.com/th/id/OIP.rmim2jYzNpSCslo60INohQHaF9?w=215&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
];

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const loadCards = (data: ImageTileType[], noOfCards: number) => {
  //collect noOfCards from ImageTileType and store it in a variable tiles
  const tiles = data.slice(0, noOfCards);

  //using spread store 2 tiles array in a single array
  const array = [...tiles, ...tiles];

  //shuffle the array
  shuffleArray(array);

  //using for loop add image to html file
  const image = document.getElementById("tile");

  for (let i = 0; i < noOfCards * 2; i++) {
    const tile = array[i];
    const imageElement = document.createElement("img");
    imageElement.src = tile.url;
    imageElement.alt = tile.name;

    image?.appendChild(imageElement);
  }
};

loadCards(imageTile, 8);

