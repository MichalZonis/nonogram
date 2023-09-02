import { states } from "./states.enum";

export default interface Game {
  Name: string;
  Author: string;
  CreationTime: Date;
  Sequence: string;  // TODO: change struct of this obj
  Height: number;
  Width: number;
  parsedPattern?: states[][];
  horizontalHints?: number[][];
  verticalHints?: number[][];
  _id: string;
}



