interface PlayerType {
  id: number;
  playerName: string;
  playerScore: number;
  playerStatus: boolean;
}

interface ImageTileType {
  id: number;
  imageUrl: string;
  name: string;
}

interface PlayerLoginType {
  username: string;
  password: string;
  player: string;
}

interface PlayerSigninType {
  name: string;
  username: string;
  password: string;
  player: string;
}

export { ImageTileType, PlayerType, PlayerLoginType, PlayerSigninType };
