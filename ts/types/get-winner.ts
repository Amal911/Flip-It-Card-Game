import{PlayerType} from "./types.js"

const get_winner=(obj1:PlayerType,obj2:PlayerType)=>{
    let winnerList:PlayerType[] = [];
    if(obj1.playerScore>obj2.playerScore)
    winnerList.push(obj1);
    else if(obj1.playerScore<obj2.playerScore)
    winnerList.push(obj2);
    else{
    winnerList.push(obj1);
    winnerList.push(obj2);
    }
   
return winnerList;
}