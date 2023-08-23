import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Game from '../models/game';
import { AuthenticationService } from './authentication.service';
import { states } from '../models/states.enum';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentGame: states[][] = [[]]
  constructor(
    private WebService: WebService,
    private auth: AuthenticationService
  ) { }

  async GetGameBySize(width: number, height: number) {
    //this.currentGame = 

    const a = await firstValueFrom(this.auth.get(`game/${width}/${height}`));
    console.log(a)
    //debugger
    // this.auth.get(`game/${width}/${height}`).subscribe((game) => {
    //   this.currentGame = game.
    //     console.log(this.currentGame)
    // })

    return a as Game
    //return this.auth.get(`game/${width}/${height}`);
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

  getColumnHints(id: string) {
    return this.auth.get(`game/${id}/hints/columns`);
  }

  saveGame(newGame: Game) {
    return this.auth.post("game", { newGame });
  }

  getBoardSeq(id: string) {
    return this.auth.get(`game/${id}`);
  }

  saveScore(score: number, userID: string, puzzleID: string) {
    let payload = {
      score: score,
      userID: userID,
      puzzleID: puzzleID
    }
    return this.auth.post('game/score', payload)
  }

  getScoresByGame(puzzleID: string) {
    return this.auth.get(`game/${puzzleID}/score`);
  }
}

