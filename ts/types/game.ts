type Score={
	player1: number,
	player2: number,
} 

let score: Score = { player1: 0, player2: 0 };  // initializing 

const updateLivescore=(id:number|string, currentScore:Score):Score=>{
	const newScore={...currentScore};  //copy the current score
	if(id==='player1') //updation
		newScore.player1 += 1;
	else if(id==='player2')
		newScore.player2 += 1;
	return newScore;
}
