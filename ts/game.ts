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