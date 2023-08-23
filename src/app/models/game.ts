import { states } from "./states.enum";

export default interface Game {
  Name: string;
  Author: string;
  CreationTime: Date;
  Sequence: string;
  Height: number;
  Width: number;
  parsedPattern?: states[][];
  _id: string;
}
