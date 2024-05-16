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

interface ImageDataType {
  animals:ImageTileType[],
  fruits:ImageTileType[],
  flowers:ImageTileType[]
}
export { ImageTileType, PlayerType, PlayerLoginType, PlayerSigninType,ImageDataType };
