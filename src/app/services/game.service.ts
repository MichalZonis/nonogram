import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Game from '../models/game';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private WebService: WebService,
    private auth: AuthenticationService
    ) { }

   GetGameBySize(width: number, height: number) {
    return this.auth.get(`game/${width}/${height}`);
  }

  getPuzzlesByUser(userID: string) {
    return this.auth.get(`game/user/${userID}`);
  }
  
  CheckWin(id: string, boardSeq: string) {
    return this.auth.get(`game/${id}/seq/${boardSeq}`);
  }

  getRowHints(id: string) {
    return this.auth.get(`game/${id}/hints/rows`);
  }

  getColumnHints(id: string){
    return this.auth.get(`game/${id}/hints/columns`);
  }

  saveGame(newGame: Game){
    return this.auth.post("game", {newGame});
  }

  getBoardSeq(id: string){
    return this.auth.get(`game/${id}`);
  }

  saveScore(score: number, userID: string, puzzleID: string){
    let payload = {score: score,
                   userID: userID,
                   puzzleID: puzzleID}
    return this.auth.post('game/score', payload)
  }

  getScoresByGame(puzzleID: string){
    return this.auth.get(`game/${puzzleID}/score`);
  }
}

