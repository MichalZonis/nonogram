import { UserDetails } from "../services/authentication.service";
import Game from "./game";

export default interface Score {
    _id: string;
    Puzzle: Game;
    Player: UserDetails;
    Time: number;
  }
  